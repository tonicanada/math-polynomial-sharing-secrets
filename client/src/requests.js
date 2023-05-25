const API_URL = "http://localhost:8000";

// Generate a secret
async function httpGenerateSecret(totalPeople, requiredPeople) {
  try {
    return await fetch(`${API_URL}/generate-secret`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requiredPeople,
        totalPeople,
      }),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}


export {
    httpGenerateSecret
}