import { Base64 } from 'js-base64';
import { getImage } from '@/app/db/image';
import cookie from 'js-cookie';

export default async function generateImage(
  user,
  title,
  width,
  height,
  description,
  image_urls,
  doRelight = false,
  isAgain = false,
  bgRemovedImageIds = [],
  script,
  script_id,
) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';
  const final_images = []
  const imageIds = []
  const bgRemovedImages = []
  const relightedImages = []
  const sceneNumbers = [];
  const hasProducts = [];
  const JWTtoken = cookie.get('auth-token');

  // skip this if it's regenerating the image
  if (!isAgain) {
    // by mapping through and using Promise.all rather than using a for loop, we can make multiple requests at once
    const bgRemovalPromises = image_urls.map( async (image) => {
      return fetch(`${BASE_URL}/image/remove-background`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWTtoken}`,
        },
        body: JSON.stringify({
          url: image,
          content_type: 'image/jpeg'
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to remove background');
        }
        return response.json()
      })
    });

    const bgRemovalResults = await Promise.all(bgRemovalPromises);

    bgRemovalResults.forEach(result => {
      bgRemovedImages.push(result.url);
      bgRemovedImageIds.push(result.image_id);
    });
  } else {
    const bgRemovedImage = bgRemovedImageIds ? await getImage( bgRemovedImageIds[0], user) : null;
    bgRemovedImage ? bgRemovedImages.push(bgRemovedImage.url) : "";
  }

  const sceneWithProducts = script.filter(scene => scene.has_product === true);
  let bgRemovedImageIdsIndex = 0;
  
  const generationPromises = sceneWithProducts.map(async (scene, index) => {
    const no_bg_image_id = bgRemovedImageIds[bgRemovedImageIdsIndex];
    const url_encoded = Base64.encode(bgRemovedImages[bgRemovedImageIdsIndex]);
    
    // Cycle through indices using modulo operator
    bgRemovedImageIdsIndex = (bgRemovedImageIdsIndex + 1) % bgRemovedImageIds.length;
    
    try {
      const response = await fetch(`${BASE_URL}/image/generate-product-image?prompt=${scene.image_script}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWTtoken}`,
        },
        body: JSON.stringify({
          url_base64: url_encoded,
          no_bg_image_id: no_bg_image_id,
          script_id: script_id,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate background for scene ${scene.scene}`);
      }
  
      const responseData = await response.json();
  
      responseData.sceneNumber = scene.scene;
      responseData.has_product = scene.has_product;
  
      return responseData;
    } catch (error) {
      console.error(`Error in background generation for scene ${scene.scene}:`, error);
      throw error;
    }
  });

  const generationResults = await Promise.all(generationPromises);

  generationResults.forEach(result => {
    if (result
      && result.url
      && result.image_id
      && result.sceneNumber
      && result.has_product === true) {
        final_images.push(result.url);
        imageIds.push(result.image_id);
        sceneNumbers.push(result.sceneNumber);
        hasProducts.push(result.has_product);
      }
  });

  // moved base64 encoding logic to the reivew page since base64 encoding string
  // is too long to be passed as a query parameter
  // 4. Return new generated image
  return {
    final_images,
    imageIds,
    bgRemovedImageIds,
    sceneNumbers,
    hasProducts
  };
}