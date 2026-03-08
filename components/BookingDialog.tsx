// components/BookingDialog.tsx
'use client';

import { useState } from 'react';
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
}

export default function BookingDialog({
  triggerText = 'Prendre RDV maintenant',
  triggerClassName = "text-xl px-12 py-8 bg-transparence text-white hover:bg-transparence shadow-2xl transition-all duration-300",
  triggerVariant = 'default',
  size = 'lg',
}: BookingDialogProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={size}
          className={triggerClassName}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ouverture...' : triggerText}
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jean Dupont"
                      className="bg-white border-sky-100 text-black placeholder:text-sky-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jean@example.com"
                      type="email"
                      className="bg-white border-sky-100 text-black placeholder:text-sky-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white border-sky-100 hover:bg-sky-50 text-sky-700',
                      !date && 'text-sky-400'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: fr }) : 'Choisir une date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-sky-200 shadow-xl rounded-xl">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={fr}
                    className="rounded-md border border-sky-200 bg-white p-3 text-sky-700"
                    classNames={{
                      day_selected: 'bg-sky-600 text-white hover:bg-sky-700 focus:bg-sky-700',
                      day_today: 'bg-sky-100 text-sky-800 font-bold',
                      day: 'hover:bg-sky-50 aria-selected:bg-sky-600 aria-selected:text-white',
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Heure</FormLabel>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-3 bg-white border border-sky-100 rounded-lg">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      'text-sm border-sky-200 hover:bg-sky-50 hover:text-sky-700 transition-colors',
                      selectedTime === time && 'bg-sky-600 text-white hover:bg-sky-700 border-sky-600'
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              {!selectedTime && date && (
                <p className="text-sm text-sky-500 mt-1">Veuillez sélectionner une heure</p>
              )}
            </FormItem>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
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
              )}
            />

            <Button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-6 text-lg transition-colors"
              disabled={isSubmitting || !date || !selectedTime}
            >
              {isSubmitting ? 'Enregistrement...' : 'Confirmer le rendez-vous'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}