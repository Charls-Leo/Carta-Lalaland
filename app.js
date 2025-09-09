(() => {
  "use strict";

  const CONFIG = { PASSWORD: "leo" }; // <-- tu contraseña
  const $ = (id) => document.getElementById(id);

  document.addEventListener("DOMContentLoaded", () => {
    let state = "locked";

    // DOM
    const gate    = $("gate");
    const content = $("content");
    const modal   = $("passwordModal");
    const dialog  = $("dialog");
    const input   = $("passwordInput");
    const errorEl = $("error");
    const sealBtn = $("sealBtn");
    const submit  = $("submitPassword");
    const bgMusic = document.getElementById('bgMusic');

    // --- Animaciones de la carta ---
    function animateLetterIn(){
      const img = document.querySelector('.letter-image img');
      if (!img || !window.gsap) return;

      // Entrada suave
      gsap.fromTo(img,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0,  opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      // Sombra "breathe" por unos segundos
      img.classList.add('letter-breathe');
      setTimeout(() => img.classList.remove('letter-breathe'), 8500);
    }


    function startMusic(){
      if (!bgMusic) return;
      bgMusic.volume = 0.35;         // ajusta si quieres
      bgMusic.play().catch(() => {
        // Si algún navegador aún bloquea el autoplay, reintenta en el siguiente toque/click
        const onceTry = () => {
          bgMusic.play().finally(() => {
            document.removeEventListener('pointerdown', onceTry, true);
          });
        };
        document.addEventListener('pointerdown', onceTry, true);
      });
    }


    // Personalización por ?n=Nombre
    const recipientName = new URLSearchParams(location.search).get("n") || "";
    const subEl = $("subheading");
    if (recipientName && subEl) {
      subEl.textContent = `Para ${recipientName}`;
    }
    if (recipientName) {
      document.title = `Feliz cumpleaños, ${recipientName}!`;
    }


    // ---- Modal
    const showPassword = () => {
      if (state !== "locked") return;
      state = "gating";
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      setTimeout(() => input && input.focus(), 0);
    };

    const hidePassword = () => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    };

    // ---- Validación
    const validate = () => {
      const ok = input.value.trim() === CONFIG.PASSWORD;
      if (!ok) {
        errorEl.textContent = "Contraseña incorrecta";
        dialog.classList.remove("shake"); void dialog.offsetWidth; dialog.classList.add("shake");
        input.select();
        return;
      }
      errorEl.textContent = "";
      input.value = "";
      hidePassword();
      openEnvelope();
    };

    // ---- Animación del sobre (UNA sola versión)
    function openEnvelope(){
      if (state === "open" || state === "opening") return;
      state = "opening";

      const letterEl = document.querySelector(".letter");

      const tl = gsap.timeline({ defaults:{ ease:"power2.out" } });
      tl.to(".hint-tap", { opacity:0, y:-6, duration:0.25 }, 0); // se desvanece


      // 1) Desaparece el sello
      tl.to(".seal", { scale:0, rotate:-30, opacity:0, duration:0.45, ease:"back.in(1.4)" });

      // 2) Abre solapa y al terminar la mandamos DETRÁS
      tl.to(".flap", { transformOrigin:"50% 0%", rotateX:180, duration:0.8 }, "-=0.05")
        .set(".flap", { zIndex: 1 }); // << clave

      // 3) La carta empieza a subir aún debajo del bolsillo
      tl.to(".letter", { y:-200, duration:0.65 }, "=0.05");

      // 4) Mini vaivén (opcional, se ve mejor)
      tl.to(".letter", { y:"-=8", duration:0.28, yoyo:true, repeat:1 }, "-=0.15");

      // 5) Transición al contenido
      tl.to("#gate", { opacity:0, duration:0.6, onComplete: () => {
        gate.style.display = "none";
        content.classList.remove("hidden");
        
        const bg = document.querySelector('.page-bg');
        if (bg) bg.classList.add('show');

        startMusic();           // ya lo tenías
        animateLetterIn();      // ← entrada y sombra

        state = "open";
        burst(); setTimeout(burst, 500); setTimeout(burst, 900);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }});
    }

    // ---- Confeti
    const burst = () => {
      if (window.confetti){
        window.confetti({ particleCount: 120, spread: 70, origin: { y: 0.2 }, scalar: 0.8 });
      }
    };

    // ---- Eventos
    sealBtn.addEventListener("click", showPassword);
    submit.addEventListener("click", validate);
    input.addEventListener("keydown", (e) => { if(e.key === "Enter") validate(); });
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape" && !modal.classList.contains("hidden")){
        hidePassword();
        if (state === "gating") state = "locked";
      }
    });
  });
})();
