import cookie from 'js-cookie';

/**
 * Returns a presigned url associated with the imageId from the database
 * @param {*} imageId
 * @returns a dictionary that contains presigned url of the image as string
 * {
 *    url: string
 * }
 */
export const getImage = async (imageId, user) => {
  const JWTtoken = cookie.get('auth-token');
  const response = await fetch(`http://localhost:8000/db/get-image/${imageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWTtoken}`,
    },
  });

  const res = await response.json();

  return res;
}