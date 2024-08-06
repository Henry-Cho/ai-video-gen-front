export const getScript = async (scriptId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:8000"}/db/get-script/${scriptId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await response.json();

  return res;
}