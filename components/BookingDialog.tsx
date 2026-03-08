'use client';

import { useState, ReactNode } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
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

interface BookingDialogProps {
  triggerText?: string;
  triggerClassName?: string;
  triggerVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  triggerChildren?: ReactNode;
}

export default function BookingDialog({
  triggerText = 'Prendre RDV maintenant',
  triggerClassName = "text-xl px-12 py-8 bg-transparence text-white hover:bg-transparence shadow-2xl transition-all duration-300",
  triggerVariant = 'default',
  size = 'lg',
  triggerChildren,
}: BookingDialogProps) {
  // ────────────────────────────────────────────────
  // Déplace TOUS les states AVANT le return
  // ────────────────────────────────────────────────
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', notes: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!date || !selectedTime) {
      toast.error('Veuillez sélectionner une date et une heure');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          date: format(date, 'yyyy-MM-dd'),
          time: selectedTime,
          notes: values.notes?.trim() ?? '',
          duration: 60,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur lors de la réservation');

      toast.success('Rendez-vous confirmé !', {
        description: 'Nous vous contacterons très prochainement.',
      });

      form.reset();
      setDate(undefined);
      setSelectedTime('');
    } catch (err: any) {
      toast.error('Échec de la réservation', {
        description: err.message || "Une erreur inattendue s'est produite.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ────────────────────────────────────────────────
  // Maintenant isSubmitting est connu partout
  // ────────────────────────────────────────────────

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={size}
          className={triggerClassName}
          disabled={isSubmitting}
        >
          {triggerChildren || (isSubmitting ? 'Ouverture...' : triggerText)}
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
            {/* ... le reste du formulaire reste IDENTIQUE ... */}
            {/* (FormField name, email, date, heure, notes, bouton submit) */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}