import cookie from "js-cookie";

export default async function generateDubbing(user, voice, prompt) {
    const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';
    const JWTtoken = cookie.get("auth-token");

    try {
        const response = await fetch(`${BASE_URL}/text/generate-dubbing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWTtoken}`,
            },
            body: JSON.stringify({
                voice: voice,
                prompt: prompt,
            }),
        });

        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(`Failed to generate dubbing: ${JSON.stringify(errorData)}`);
        // }

        return await response.json();
    } catch (error) {
        console.error("Error generating dubbing:", error);
        throw error;
    }
}
