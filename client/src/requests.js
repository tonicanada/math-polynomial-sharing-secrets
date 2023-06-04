import { saveAs } from "file-saver";
import axios from "axios";

const API_URL = "http://localhost:8000";

const httpGetUser = async () => {
  try {
    const response = await fetch("/get-user"); // Cambia la URL según la configuración de tu servidor
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to get user data");
    }
  } catch (error) {
    throw new Error("Failed to get user data: " + error.message);
  }
};


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

async function httpDownloadShares() {
  try {
    const response = await fetch(`${API_URL}/download-shares`);
    const blob = await response.blob();
    saveAs(blob, "secret-shares.xlsx");
  } catch (error) {
    console.log("Error downloading shares:", error);
  }
}

async function httpCheckSecret(droppedFiles) {
  try {
    const formData = new FormData();
    formData.append("file", droppedFiles[0]);

    // Realiza la solicitud HTTP utilizando Axios
    const response = await axios.post(`${API_URL}/check-secret`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.status);
    response["ok"] = true;

    return response;
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpGetPublicDataCurrentSecret() {
  try {
    const response = await fetch(`${API_URL}/get-public-data-current-secret`);
    return await response.json();
  } catch (error) {
    console.log("Error fetching the data:", error);
  }
}

async function httpClearSecret() {
  try {
    const response = await fetch(`${API_URL}/clear-secret`, {
      method: "post",
    });
    return response;
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export {
  httpGetUser,
  httpGenerateSecret,
  httpDownloadShares,
  httpCheckSecret,
  httpGetPublicDataCurrentSecret,
  httpClearSecret,
};
