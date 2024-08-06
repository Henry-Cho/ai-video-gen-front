import cookie from "js-cookie";

export default async function generateVideo(audio_id, video_id, bg_audio_id, fontsize, subtitle_color) {
    const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';
    const JWTtoken = cookie.get("auth-token");
    try {
        const response = await fetch(`${BASE_URL}/video/generate-combined-video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWTtoken}`,
            },
            body: JSON.stringify({
                audio_id: audio_id,
                video_id: video_id,
                bg_audio_id: bg_audio_id,
                fontsize: fontsize,
                subtitle_color: subtitle_color,
            }),
        });
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(`Failed to generate video: ${JSON.stringify(errorData)}`);
        // }

        return await response.json();
    }
    catch (error) {
        console.error("Error generating video:", error);
        throw error;
    }
}