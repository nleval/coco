  const correctPassword = "b62a815d29a699dba1696448478e35de46ac7856408e2280191db6d135a55da2";
  const correctPassword2 = "cf3a3bbe331c3950d16a8e9917c5bb8340e7c0ef917da25d4a96f92d074bce05";

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
  }


  async function checkPassword() {
    const input = document.getElementById("password").value;
    const hashedInput = await hashPassword(input);

    const login = document.getElementById("login");
    const content = document.getElementById("content");
    const secret = document.getElementById("secretZone");

    if (hashedInput === correctPassword) {
      login.style.display = "none";
      content.style.display = "block";
      secret.style.display = "none"; // accès normal
    }
    else if (hashedInput === correctPassword2) {
      login.style.display = "none";
      content.style.display = "block";
      secret.style.display = "block"; // accès spécial
    }
    else {
      document.getElementById("error").textContent = "Mot de passe incorrect 😢";
    }
  }