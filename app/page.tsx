'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, CheckCircle, Clock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from "framer-motion";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ParticleBackground from '@/components/BackgroundParticles';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  notes: z.string().optional(),
});

const timeSlots = Array.from({ length: 19 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', notes: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!date || !selectedTime) {
      toast.error("Date et heure requises");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          date: format(date, 'yyyy-MM-dd'),
          time: selectedTime,
          notes: values.notes,
          duration: 60,
        }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Erreur');

      toast.success("RDV confirmé !");
      form.reset();
      setDate(undefined);
      setSelectedTime('');
    } catch (err: any) {
      toast.error("Échec", { description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-transparence text-white">
      <ParticleBackground />
      {/* Hero */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-transparence">
        <div className="max-w-6xl mx-auto text-center">
        <motion.h1
  className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
  animate={{
    y: [0, -15, 0],
    scale: [1, 1.015, 1],      // très légère pulsation (1.5 %)
    rotate: [0, 0.6, -0.6, 0], // oscillation de 0.6°
  }}
  transition={{
    y: {
      duration: 9,
      repeat: Infinity,
      repeatType: "reverse",
      ease: [0.42, 0, 0.58, 1], // easeInOutSine – très doux
    },
    scale: {
      duration: 12,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
    rotate: {
      duration: 14,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }}
>
  Novainfogé <br className="hidden md:block" />
</motion.h1>
          <p className="text-xl md:text-2xl text-zinc-200 mb-16 max-w-3xl mx-auto">
            Société d'infogérence et d'accompagnement IT.  
            Disponibilités en temps réel.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 bg-transparence text-white hover:bg-transparence shadow-2xl transition-all duration-300"
              >
                Prendre RDV maintenant
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-sky-600 text-sky-600">
              <DialogHeader>
                <DialogTitle className="text-2xl">Prendre rendez-vous</DialogTitle>
                <DialogDescription className="text-sky-600">
                  Choisissez une date et une heure qui vous conviennent.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} className="bg-transparence border-sky-100 text-white placeholder:text-sky-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jean@example.com" type="email" {...field} className="bg-white border-sky-100 text-white placeholder:text-sky-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white border-sky-100 hover:bg-sky-600 text-sky-300",
                            !date && "text-sky-200"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3 bg-white border-sky-200 shadow-lg rounded-lg">
                        <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              className="rounded-md border border-sky-200 bg-black p-3 text-sky-600"
                              classNames={{
                                // Essaie ces variantes – une au moins devrait passer
                                day_selected: 
                                  "data-[selected=true]:bg-sky-600 data-[selected=true]:text-white data-[selected=true]:hover:bg-sky-700 data-[selected=true]:focus:bg-sky-700",
                                
                                // Ou encore plus agressif
                                cell: 
                                  "[&:has([data-selected=true])]:bg-sky-600 [&:has([data-selected=true])]:text-white [&:has([data-selected=true])]:rounded-md",
                                
                                // Variante aria-selected (très efficace en v9+)
                                day: 
                                  "aria-selected:bg-sky-600 aria-selected:text-white aria-selected:hover:bg-sky-700 aria-selected:focus:bg-sky-700",
                              }}
                            />
                    </PopoverContent>
                    </Popover>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Heure</FormLabel>
                    <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 bg-white border border-sky-100 rounded-md">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "text-sm bg-sky-300 border-sky-100 hover:bg-zinc-600",
                            selectedTime === time && "bg-blue-600 hover:bg-blue-700 border-blue-600"
                          )}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </FormItem>

                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (facultatif)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Précisions sur le rendez-vous..."
                          className="bg-white border-sky-100 text-black min-h-[100px] placeholder:text-sky-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    className="w-full bg-white text-sky-500 hover:bg-sky-100 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Confirmer le rendez-vous'}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          {/* LA VIDÉO – juste après le bouton */}
  <div className="mt-16 w-full max-w-4xl mx-auto px-4">
    {/* Option 1 : Vidéo hébergée sur ton serveur (public/videos/ma-video.mp4) */}
    <video
      autoPlay
      muted
      playsInline
      className="w-full rounded-2xl shadow-2xl border border-sky-200"
    >
      <source src="/videos/upscaled-video.mp4" type="video/mp4" />
      Ton navigateur ne supporte pas la vidéo.
    </video>

    {/* Option 2 : Vidéo YouTube/Vimeo (plus simple si déjà uploadée) */}
    {/* <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-sky-200">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID"
        title="Présentation de Novinfogé"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div> */}
  </div>

        </div>
      </section>

      {/* Pourquoi choisir */}
      <section className="py-24 px-6 bg-transparence">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Pourquoi choisir NovaInfogé ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-sky-300 hover:border-zinc-600 transition-colors">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-sky-600">Support</h3>
              <p className="text-sky-300">
                Passage régulier sur le site de l'entreprise ou prise en main à distance
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-sky-100 hover:border-zinc-600 transition-colors">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-sky-600">Conseilles et Développement</h3>
              <p className="text-sky-300">
                Novainfogé s'engage dans un accompagenment IT afin de développer votre infrastructure.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-sky-100 hover:border-zinc-600 transition-colors">
              <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-sky-600">infogérence </h3>
              <p className="text-sky-300">
                Novainfogé prend en charge la gestion, la maintenance, la supervision et la sécurisation de l’infrastructure informatique de votre entreprise. 
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Bloc blanc tout en bas : À propos + Mentions légales */}
        <footer className="bg-white py-16 px-6 text-gray-800 border-t border-gray-200">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            

            {/* Mentions légales */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-sky-700">Mentions légales</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Éditeur :</strong> NovaInfogé<br />
                <strong>SIRET :</strong> [100 796 622 00015]<br />
                <strong>Contact :</strong> [mail: gregory.rastoll@Novainfogé.com] | [tel:0617856420]<br />
              </p>
              <p className="text-gray-700 leading-relaxed text-sm">
                Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, les coordonnées de l’hébergeur sont : [Nom hébergeur, adresse, etc.].  
                Le site est hébergé par [ex. Vercel / OVH / autre].
              </p>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Novinfogé. Tous droits réservés.
          </div>
        </footer>
      </div>
    
  );
}