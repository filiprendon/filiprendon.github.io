const clientId = "3f1100a54f2549dcb2451025697915cd";
const redirectUri = "https://filiprendon.github.io/spotifyData.html";

async function login() {
  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier = generateRandomString(64);
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // permisos
  const scope = "user-read-private user-read-currently-playing user-read-recently-played user-top-read user-read-playback-state user-modify-playback-state";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");
