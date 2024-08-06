import cookie from "js-cookie";

export default async function generateSubtitle(user, audio_id) {
    const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000';
    const JWTtoken = cookie.get("auth-token");
    
    return fetch(`${BASE_URL}/text/generate-subtitle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWTtoken}`,
        },
        body: JSON.stringify({
            audio_id: audio_id,
        }),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to generate subtitle');
        }
        return response.json();
    })
}