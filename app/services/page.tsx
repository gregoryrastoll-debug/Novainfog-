// app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  Users,
  Server,
  HardDrive,
  Network,
  ArrowRight,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParticleBackground from '@/components/BackgroundParticles';

import BookingDialog from '@/components/BookingDialog';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function Services() {
  return (
    <div className="min-h-screen bg-transparence from-black via-zinc-950 to-black text-white">
      <ParticleBackground />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-transparence -z-10 pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
          >
            Nos Services
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl lg:text-3xl text-zinc-300 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Votre informatique <span className="text-white font-semibold">fiable</span>,{" "}
            <span className="text-blue-400 font-semibold">sécurisée</span> et{" "}
            <span className="text-blue-400 font-semibold">évolutive</span>
          </motion.p>
        </motion.div>
      </section>

      {/* Support & Proximité */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "" }}
        variants={staggerContainer}
        className="py-20 md:py-20 px-6 md:px-12 lg:px-24  border-sky-700"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Support & Proximité humaine
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Nous intervenons là où vous êtes — sur site ou à distance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Carte 1 */}
            <motion.div
              variants={fadeInUp}
              className="group relative bg-white/70 border border-white/80 rounded-2xl p-8 transition-all duration-300 hover:border-blue-800/50 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-blue-950/20"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-200 text-blue-400 transition-colors group-hover:bg-blue-900/60">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-700">Passage régulier sur site</h3>
              <p className="text-sky-500 leading-relaxed">
                Visites planifiées (hebdo, bi-mensuel, mensuel) pour maintenance préventive, vérification matérielle et relation de confiance.
              </p>
            </motion.div>

            {/* Carte 2 */}
            <motion.div
              variants={fadeInUp}
              className="group relative bg-white/70 border border-white/80 rounded-2xl p-8 transition-all duration-300 hover:border-blue-800/50 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-blue-950/20"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-200 text-blue-400 transition-colors group-hover:bg-blue-900/60">
                <Network className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-700">Prise en main à distance</h3>
              <p className="text-sky-500 leading-relaxed">
                Intervention rapide et sécurisée (AnyDesk, TeamViewer, Splashtop…) — même en urgence, soir & week-end.
              </p>
            </motion.div>

            {/* Carte 3 */}
            <motion.div
              variants={fadeInUp}
              className="group relative bg-white/70 border border-white/80 rounded-2xl p-8 transition-all duration-300 hover:border-blue-800/50 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-blue-950/20"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-200 text-blue-400 transition-colors group-hover:bg-blue-900/60">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-700">Interlocuteur dédié</h3>
              <p className="text-sky-500 leading-relaxed">
                Une seule personne qui connaît vraiment votre parc, vos usages et vos priorités.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Infogérance & Supervision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-transparence  border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Infogérance complète
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Nous prenons en charge la gestion, la maintenance, la supervision 24/7 et la sécurisation de votre SI.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <div className="group relative bg-white/70 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-blue-800/50 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-blue-950/20">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-200 text-blue-400 transition-colors group-hover:bg-blue-900/60">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-700">Cybersécurité proactive</h3>
              <p className="text-sky-500">
                EDR/XDR, patching automatique, sauvegardes immuables 3-2-1-1, tests réguliers de restauration.
              </p>
            </div>

            <div className="group relative bg-white/70 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-blue-800/50 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-blue-950/20">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-200 text-blue-400 transition-colors group-hover:bg-blue-900/60">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-700">Monitoring & alertes 24/7</h3>
              <p className="text-sky-500">
                Supervision temps réel, détection précoce des anomalies, rapports mensuels.
              </p>
            </div>

            <div className="group relative bg-white/70 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-blue-800/50 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-blue-950/20">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-200 text-blue-400 transition-colors group-hover:bg-blue-900/60">
                <HardDrive className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-700">Sauvegardes & reprise</h3>
              <p className="text-sky-500">
                Stratégie 3-2-1-1, tests de restauration réguliers, protection anti-ransomware.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA final avec animation pouce qui brille */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-28 md:py-40 px-6 text-center  border-white bg-gradient-to-t from-blue-950/20 via-white/10 to-white/40"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Prêt à avoir un SI qui travaille <span className="text-blue-400">pour vous</span> ?
          </h2>

          <p className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto">
            Arrêtez de subir les pannes. Commencez à profiter d’une informatique sereine et évolutive.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block relative"
          >
            <BookingDialog
              triggerClassName="text-2xl sm:text-3xl px-12 sm:px-16 py-8 sm:py-10 bg-gradient-to-r from-white to-zinc-200 text-black hover:from-zinc-100 hover:to-white shadow-2xl shadow-blue-950/40 transition-all duration-500 group relative overflow-hidden"
              children={
                <div className="flex items-center gap-4">
                  <ThumbsUp className="h-8 w-8 text-blue-600 group-hover:text-blue-500 transition-colors" />
                  <span>Parlons de votre projet</span>
                  <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
                </div>
              }
            />

            {/* Effet glow / shine autour du bouton */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}