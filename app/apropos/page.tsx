// app/apropos.tsx
import { CheckCircle, Clock, Users, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ParticleBackground from '@/components/BackgroundParticles';

export default function APropos() {
  return (
    <div className="min-h-screen bg-transparence text-white pt-24"> {/* pt-24 pour laisser de la place à la navbar fixe */}
    <ParticleBackground />
      {/* Hero / Titre */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparence">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            À propos de Novainfogé
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto">
            Nous transformons les problèmes IT en solutions simples, rapides et fiables.
          </p>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-transparence">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Une mission claire
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              Novainfogé est née d’un constat simple : l’informatique est souvent source de stress pour les entreprises et les indépendants.  
              Notre objectif ? Vous libérer de ces contraintes pour que vous puissiez vous concentrer sur ce que vous faites de mieux.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Que vous soyez une PME, un artisan, un commerçant ou un indépendant, nous vous accompagnons avec des solutions sur mesure, transparentes et sans jargon inutile.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-transparence rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Réactivité</h3>
                <p className="text-zinc-400">
                  Intervention rapide, réponse sous 24h maximum.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-transparence rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fiabilité</h3>
                <p className="text-zinc-400">
                  Solutions testées, sécurisées et évolutives.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-transparence rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Proximité</h3>
                <p className="text-zinc-400">
                  Accompagnement humain, en présentiel ou à distance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-6 bg-transparence text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Prêt à simplifier votre informatique ?
          </h2>
          <p className="text-xl text-zinc-400 mb-12">
            Contactez-nous ou réservez un créneau directement.
          </p>

          <Button size="lg" className="text-xl px-12 py-8 bg-transparence text-black hover:bg-gray-transparence">
            Prendre RDV maintenant
          </Button>
        </div>
      </section>
    </div>
  );
}