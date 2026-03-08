'use client';

import { motion } from 'framer-motion';
import ParticleBackground from '@/components/BackgroundParticles';
import BookingDialog from '@/components/BookingDialog';  // ← Composant partagé avec le formulaire

import { CheckCircle, Clock, Mail } from 'lucide-react';

// ────────────────────────────────────────────────
// Animations identiques à services.tsx
// ────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
// ────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-transparence text-white relative">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-transparence">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
              // Animation continue subtile (gardée telle quelle)
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.012, 1],
                rotate: [0, 0.5, -0.5, 0],
              }}
              transition={{
                y: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                scale: { duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                rotate: { duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              }}
            >
              Novainfogé
              <br className="hidden md:block" />
            </motion.h1>

            <motion.p 
              variants={fadeInUp} 
              className="text-xl md:text-2xl text-zinc-200 mb-16 max-w-3xl mx-auto"
            >
              Société d'infogérance et d'accompagnement IT.  
              Disponibilités en temps réel.
            </motion.p>

            <motion.div variants={fadeInUp}>
              {/* ← Le bouton est maintenant le composant BookingDialog */}
              <BookingDialog 
                triggerText="Prendre RDV maintenant"
                triggerClassName="text-xl px-12 py-8 bg-transparence text-white hover:bg-transparence shadow-2xl transition-all duration-300"
              />
            </motion.div>

            {/* Vidéo */}
            <motion.div 
              variants={fadeInUp} 
              className="mt-16 w-full max-w-4xl mx-auto px-4"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-2xl shadow-2xl border border-sky-200 object-cover"
              >
                <source src="/videos/upscaled-video.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi choisir NovaInfogé ? */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="py-24 px-6 bg-transparence"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Pourquoi choisir NovaInfogé ?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Support',
                text: 'Passage régulier sur le site de l’entreprise ou prise en main à distance',
              },
              {
                icon: Clock,
                title: 'Conseils et Développement',
                text: 'Novainfogé s’engage dans un accompagnement IT afin de développer votre infrastructure.',
              },
              {
                icon: Mail,
                title: 'Infogérance',
                text: 'Novainfogé prend en charge la gestion, la maintenance, la supervision et la sécurisation de l’infrastructure informatique de votre entreprise.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-sky-200 hover:border-sky-400 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-sky-700 text-center">{item.title}</h3>
                <p className="text-sky-600 text-center">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer – maintenant géré dans layout.tsx */}
    </div>
  );
}