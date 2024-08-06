import cookie from "js-cookie";

export default async function generateBgmusic(user, script_id, prompt, duration=60) {
    const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';
    const JWTtoken = cookie.get("auth-token");

    try {
        const response = await fetch(`${BASE_URL}/audio/generate-music`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWTtoken}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                duration: duration,
                script_id: script_id,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to generate music: ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error generating music:", error);
        throw error;
    }
}
