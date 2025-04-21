const audio = document.getElementById('sobre-mi-audio');
let wasPausedManually = false;

function toggleAudio() {
  if (audio.paused) {
    if (wasPausedManually) {
      audio.play();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
    wasPausedManually = false;
  } else {
    audio.pause();
    wasPausedManually = true;
  }
}

function setLanguage(lang) {
  console.log("Idioma seleccionado:", lang);
}

async function enviarPregunta() {
  const input = document.getElementById('userInput').value;
  const respuesta = document.getElementById('respuesta');
  respuesta.innerText = "Pensando...";

  const res = await fetch("https://backend-zl91.onrender.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();
  respuesta.innerText = data.completion || "No hubo respuesta.";
}
