import cookie from 'js-cookie';

export async function generateMultipleAIImages(narration_script, user, script_id) {
  const BASE_URL = 'http://localhost:8000';
  const final_images = [];
  const imageIds = [];
  const sceneNumbers = [];
  const hasProducts = [];
  const JWTtoken = cookie.get('auth-token');

  // Map through narration_script and generate images concurrently
  const generationPromises = narration_script.map(async (scene, index) => {
    if (scene.image_script === "" || scene.image_script === "Blank screen" || scene.has_product === true) {
      return { content: {url: "", image_id: "", sceneNumber: scene.scene, has_product: scene.has_product} };
    }

    try {
      const response = await fetch(`${BASE_URL}/image/generate-paid-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWTtoken}`,
        },
        body: JSON.stringify({
          prompt: scene.image_script,
          outputTitle: scene.image_title,
          script_id: script_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI image');
      }

      const responseData = await response.json();
      responseData.sceneNumber = scene.scene;
      responseData.has_product = scene.has_product;

      return responseData;
    } catch (error) {
      console.error('Error generating AI image:', error.message);
      return { url: null, image_id: null,  }; // Return empty result on error
    }
  });

  // Wait for all generation promises to resolve
  const generationResults = await Promise.all(generationPromises);
  console.log(generationResults);
  // Process results
  generationResults.forEach(result => {
    if (result && result['content']
        && result['content'].url
        && result['content'].image_id
        && result.sceneNumber
        && result.has_product === false) {
      final_images.push(result['content'].url);
      imageIds.push(result['content'].image_id);
      sceneNumbers.push(result.sceneNumber);
      hasProducts.push(result.has_product);
    }
  });

  // Return generated images and IDs
  return {
    final_images,
    imageIds,
    sceneNumbers,
    hasProducts,
  };
}

export async function generateSingleAIImage(prompt, outputTitle) {
  const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';

    try {
      const response = await fetch(`${BASE_URL}/image/generate-paid-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          outputTitle: outputTitle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI image');
      }

      const responseData = await response.json();

      return { url: responseData['content'].url, image_id: responseData['content'].image_id };

    } catch (error) {
      console.error('Error generating AI image:', error.message);
      return { url: "", image_id: "",  }; // Return empty result on error
    }
}

export async function generateAIImage(prompt, outputTitle, user) {
  const BASE_URL = 'http://localhost:8000';
  const JWTtoken = cookie.get("auth-token");

  try {
    const response = await fetch(`${BASE_URL}/image/generate-paid-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWTtoken}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        outputTitle: outputTitle,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI image');
    }

    const responseData = await response.json();

    return { url: responseData['content'].url, image_id: responseData['content'].image_id };

  } catch (error) {
    console.error('Error generating AI image:', error.message);
    return { url: "", image_id: "",  }; // Return empty result on error
  }
}