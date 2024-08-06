import cookie from 'js-cookie';
import { encodeToJWT } from '@/app/utils';

export default async function generateFinalVideo(
    user,
    selectedVoice,
    dubbing, // dubbing text
    script_id,
    bgmusicScript,
    bgDuration,
    fontsize,
    subtitle_color,
    imageScripts,
    imageURLs,
) {
    const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';
    const JWTtoken = await encodeToJWT(user);
    const user_id = user.sub;
    
    const response = await fetch(`${BASE_URL}/video/generate-final-video`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWTtoken}`,
        },
        body: JSON.stringify({
            voice: selectedVoice,
            input: dubbing,
            bg_music_prompt: bgmusicScript,
            bg_duration: bgDuration,
            fontsize: fontsize,
            subtitle_color: subtitle_color,
            script_id: script_id,
            user_id,
            image_prompts: imageScripts,
            image_urls: imageURLs,
        }),
    });
    return response;
}
