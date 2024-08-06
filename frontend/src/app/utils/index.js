const BACKEND_API_URL = 'http://localhost:8000';
const RESULT_API_URL = 'http://localhost:3001/videos';
import { mockMusicList } from '../data/mockMusicList';
import * as jose from 'jose';
import cookie from 'js-cookie';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function addVideo(videoInput, user) {
  try {
    const video = await getVideoData();
    const newVideo = {
      ...videoInput,
      ...video,
    };
    const JWTtoken = cookie.get('auth-token');

    const response = await fetch(RESULT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWTtoken}`,
      },
      body: JSON.stringify(newVideo),
    });

    if (!response.ok) {
      throw new Error(`Failed to add review: ${response.statusText}`);
    }

    const addedVideo = await response.json();
    return addedVideo;
  } catch (error) {
    console.error('Error adding video:', error);
    throw new Error('Failed to add video');
  }
}

export async function getAllScripts() {
  const { data } = await supabase.from("Scripts").select("script_id");
  return data;
}

export async function addReview(review, user, images) {
  const JWTtoken = cookie.get('auth-token');
  console.log(JWTtoken);
  try {
    const request_body = {
      number_of_product_images: images.length.toString(),
      title: review.title,
      product_description: review.product_description,
      video_description: review.video_description,
      dimension: `${review.length}x${review.width}x${review.height} inches`,
    };

    // Post the new review to the json-server
    const response = await fetch(`${BACKEND_API_URL}/text/generate-script`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWTtoken}`,
      },
      body: JSON.stringify(request_body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get backend script data: ${response.statusText}`
      );
    }

    const addedReview = await response.json();
    return addedReview;
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Failed to add review');
  }
}

export async function getReview(id, user) {
  const JWTtoken = cookie.get('auth-token');
  try {
    const response = await fetch(`${BACKEND_API_URL}/text/script/?script_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWTtoken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch review: ${response.statusText}`);
    }

    const review = await response.json();

    // Mocking the prompt script and music URL
    review.promptScript = 'Sample prompt script from getReview.';
    review.musicUrl = 'https://sample-videos.com/audio/mp3/wave.mp3'; // Mocked music URL
    review.dubbing = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from
      45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up
      one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
      literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
      (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
      during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`;
    review.musicList = mockMusicList;

    return review;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw new Error('Failed to fetch review');
  }
}

export async function getVideo(id) {
  const JWTtoken = cookie.get('auth-token');
  try {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${JWTtoken}`,
    // }
    const response = await fetch(`${RESULT_API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const video = await response.json();

    return video;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw new Error('Failed to fetch video');
  }
}

export async function getVideoData(script_id) {
  try {
    let { data } = await supabase
      .from('Videos')
      .select("*")
      .eq('script_id', script_id)
      .eq('type', "final_video")
      .single()

    return data;
  } catch (error) {
    console.error('Error fetching video data:', error);
    throw new Error('Failed to fetch video data');
  }
}

export async function getImages(script_id, user_id) {
  try {

    // Fetch data from the 'Images' table with specified conditions
    let { data, error } = await supabase
      .from('Images')
      .select('url, no_bg_image_id, prompt')
      .eq('script_id', script_id)
      .eq('user_id', user_id)
      .in('type', ['post', 'from_text']) // Use .in() for array matching
      .order('created_at', { ascending: false }); // Use ascending: false for descending order

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw new Error('Failed to fetch image data');
  }
}

// Mock function to simulate YouTube API music search
export async function searchMusicOnYouTube(query) {
  return {
    title: `Mocked YouTube Video for ${query}`,
    url: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3', // Mocked YouTube video URL
  };
}

export const encodeToJWT = async (token) => {
  const payload = {
    "user_id": token.sub,
    "role": token.role,
    "exp": token.exp,
    "iat": token.iat,
    "session_id": token.session_id,
  }
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    const JWTtoken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('12h')
      .sign(secret);
    return JWTtoken;
  } catch (err) {
    console.error('Invalid token:', err);
    return null
  }
}

export const callApiWithLogging = async (name, apiCall, updateApiCallStatus) => {
  updateApiCallStatus(name, true);
  const startTime = Date.now();

  try {
    const response = await apiCall();
    const endTime = Date.now();
    updateApiCallStatus(name, false, endTime - startTime);
    return response;
  } catch (error) {
    const endTime = Date.now();
    updateApiCallStatus(name, false, endTime - startTime, true);
    throw error;
  }
};