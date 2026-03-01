// src/components/BackgroundParticles.tsx
'use client';

import { useEffect } from 'react'; 

declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
  }
}
export default function ParticleBackground() {
  useEffect(() => {
    console.log('Montage de ParticleBackground');

    const script = document.createElement('script');
    script.src = '/particles.js';  // TON fichier dans public/particles.js
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('TON particles.js local a été chargé avec succès');

      if (window.particlesJS) {
        // Si ton fichier particles.js lance déjà l'animation automatiquement → rien à faire
        // Sinon, force l'appel ici avec ta config (adapte si besoin)
        window.particlesJS('particles-js', {
          // Colle ici ta config complète si elle n'est pas déjà dans particles.js
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 5, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        });

        console.log('particlesJS lancé → effet repulse devrait fonctionner');
      } else {
        console.error('window.particlesJS n\'existe pas après chargement');
      }
    };

    script.onerror = (err) => {
      console.error('Erreur lors du chargement de particles.js local', err);
    };

    // Cleanup doux : on ne supprime pas le script en dev pour éviter bugs StrictMode
    return () => {
      console.log('Démontage de ParticleBackground');
      // document.body.removeChild(script); // ← commente cette ligne en dev
    };
  }, []);

  return (
    <div
      id="particles-js"
      className="fixed inset-0 z-[-1]"
      style={{
        background: '#275b9fff',
        pointerEvents: 'auto',      // ← IMPORTANT : réactive les événements souris pour repulse
        opacity: 1,                 // ← force la visibilité
        willChange: 'transform',    // ← aide le rendu GPU
      }}
    />
  );
}