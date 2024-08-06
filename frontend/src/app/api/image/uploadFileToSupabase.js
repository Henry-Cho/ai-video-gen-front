import cookie from 'js-cookie';

export default async function uploadFileToSupabase(user, images, type) {
  const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';

  const JWTtoken = cookie.get('auth-token');

  const promises = images.map(async (image) => {
    // remove the metadata attached in the front of dataURLs
    const base64_image = image.split(',')[1];
    const body = {
      content: base64_image,
      content_type: type,
    }
    return fetch(`${BASE_URL}/upload/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWTtoken}`,
        },
        body: JSON.stringify(body),
    }).then(response => response.json());
  })
  const result = await Promise.all(promises);
  const urls = result.map((res) => res.url);
  return urls;
}