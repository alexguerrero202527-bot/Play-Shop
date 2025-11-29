// Mensaje de bienvenida en consola
console.log("Bienvenido a la página de descarga de música 🎵");

// Espera a que el contenido HTML esté completamente cargado antes de ejecutar el resto del código
document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // SECCIÓN 1: BOTONES DE DESCARGA
  // ============================
  const botonesDescarga = document.querySelectorAll(".download");

  botonesDescarga.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const nombreCancion = boton.getAttribute("href").split("/").pop();
      alert(`Descargando: ${nombreCancion}`);
    });
  });

  // ============================
  // SECCIÓN 2: BOTONES DE REPRODUCCIÓN
  // ============================
  const botonesReproducir = document.querySelectorAll(".play-button");

  botonesReproducir.forEach(boton => {
    boton.addEventListener("click", function () {
      const audioId = this.getAttribute("data-audio");
      const audio = document.getElementById(audioId);

      // Pausar todos los audios antes de reproducir el seleccionado
      document.querySelectorAll("audio").forEach(a => {
        if (a !== audio) a.pause();
      });

      if (!audio.paused) {
        audio.pause();
        this.textContent = "▶️ Reproducir Música";
      } else {
        audio.play();
        this.textContent = "⏸️ Pausar Música";
      }

      audio.addEventListener("ended", () => {
        this.textContent = "▶️ Reproducir Música";
      });
    });
  });

}); // <-- cierre correcto del DOMContentLoaded

// ============================
// SECCIÓN 3: YOUTUBE DINÁMICO
// ============================

// Función auxiliar para extraer el ID del video
function extractVideoId(url) {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Función para cargar el video de YouTube
function loadYouTube() {
  const url = document.getElementById("youtube-url").value;
  const videoId = extractVideoId(url);
  if (videoId) {
    document.getElementById("youtube-frame").src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    alert("Por favor ingresa un enlace válido de YouTube.");
  }
}