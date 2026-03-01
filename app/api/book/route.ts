// app/api/book/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";
import { formatISO } from "date-fns";

// ────────────────────────────────────────────────
// POST /api/book - Création d'un rendez-vous
// ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  console.log("╔════════════════════════════════════════════╗");
  console.log("║         NOUVELLE REQUÊTE POST /api/book    ║");
  console.log("╚════════════════════════════════════════════╝");

  try {
    // 1. Lecture du body
    let body;
    try {
      body = await req.json();
      console.log("Body reçu :", body);
    } catch (parseErr) {
      console.error("Erreur lors du parsing JSON :", parseErr);
      return NextResponse.json(
        { error: "Le corps de la requête n'est pas un JSON valide" },
        { status: 400 }
      );
    }

    const { name, email, date, time, notes = "", duration = 60 } = body;

    // 2. Validation des champs obligatoires
    if (!name?.trim() || !email?.trim() || !date || !time) {
      console.warn("Validation échouée - champs manquants :", { name, email, date, time });
      return NextResponse.json(
        { error: "Les champs name, email, date et time sont obligatoires" },
        { status: 400 }
      );
    }

    // Validation format date/heure simple
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Date invalide (format attendu : YYYY-MM-DD)" }, { status: 400 });
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ error: "Heure invalide (format attendu : HH:mm)" }, { status: 400 });
    }

    // 3. Initialisation du client Google Calendar
    let calendar;
    try {
      calendar = await getCalendarClient();
      console.log("→ Client Calendar authentifié avec succès");
    } catch (authErr: any) {
      console.error("Échec de l'authentification Google :", {
        message: authErr.message,
        code: authErr.code,
        details: authErr.response?.data || authErr.toString(),
      });
      return NextResponse.json(
        { error: "Impossible d'authentifier avec Google", debug: authErr.message },
        { status: 500 }
      );
    }

    // 4. Préparation des dates (Europe/Paris)
    const startDateTime = new Date(`${date}T${time}:00+01:00`);
    if (isNaN(startDateTime.getTime())) {
      return NextResponse.json({ error: "Date ou heure invalide" }, { status: 400 });
    }

    const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000);

    const calendarId = process.env.CALENDAR_ID || "primary";
    console.log(`→ Calendrier utilisé : ${calendarId}`);

    // 5. Vérification de disponibilité (freebusy)
    try {
      const freeBusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: formatISO(startDateTime),
          timeMax: formatISO(endDateTime),
          items: [{ id: calendarId }],
        },
      });

      const busyPeriods = freeBusyRes.data.calendars?.[calendarId]?.busy || [];
      if (busyPeriods.length > 0) {
        console.warn("Créneau déjà pris :", busyPeriods);
        return NextResponse.json(
          { error: "Ce créneau est déjà réservé" },
          { status: 409 }
        );
      }
      console.log("→ Créneau libre : OK");
    } catch (fbErr: any) {
      console.warn("Attention : freebusy a échoué, on continue quand même", fbErr.message);
      // Ne bloque pas la création si freebusy échoue (rare)
    }

    // 6. Création de l'événement
    const event = {
      summary: `RDV avec ${name.trim()}`,
      description: notes.trim()
        ? `${notes.trim()}\n\nContact : ${email.trim()}`
        : `Contact : ${email.trim()}`,
      start: {
        dateTime: formatISO(startDateTime),
        timeZone: "Europe/Paris",
      },
      end: {
        dateTime: formatISO(endDateTime),
        timeZone: "Europe/Paris",
      },
      // attendees: [{ email: email.trim() }],  // ← COMMENTÉ : nécessite Domain-Wide Delegation
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 }, // Rappel 24h avant
          { method: "popup", minutes: 30 },   // Popup 30 min avant
        ],
      },
      // conferenceData: { ... },             // ← COMMENTÉ : nécessite des droits supplémentaires
      // conferenceDataVersion: 1,
    };

    console.log("→ Payload événement :", {
      summary: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
      calendarId,
    });

    // Insertion de l'événement
    const insertRes = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: "none",  // Pas d'email envoyé (car pas d'attendees)
    });

    console.log("→ ÉVÉNEMENT CRÉÉ AVEC SUCCÈS :", {
      id: insertRes.data.id,
      htmlLink: insertRes.data.htmlLink,
      // hangoutLink: insertRes.data.hangoutLink,
    });

    return NextResponse.json({
      success: true,
      eventId: insertRes.data.id,
      htmlLink: insertRes.data.htmlLink,
      message: "Rendez-vous créé avec succès dans votre agenda",
    });

  } catch (error: any) {
    // ────────────────────────────────────────────────
    // LOG DÉTAILLÉ POUR LE DEBUG
    // ────────────────────────────────────────────────
    console.error("╔═══════════════════════════════════════════════╗");
    console.error("║       ERREUR CRITIQUE LORS DE LA CRÉATION        ║");
    console.error("╚═══════════════════════════════════════════════╝");

    console.error("Message principal :", error.message || "Erreur inconnue");
    console.error("Code erreur :", error.code);
    console.error("Status HTTP :", error.response?.status || "inconnu");

    if (error.response?.data) {
      console.error("Réponse Google complète :", JSON.stringify(error.response.data, null, 2));
    }

    console.error("Stack trace (début) :", error.stack?.substring(0, 800) || "pas de stack");

    console.error("Variables d'environnement (présence) :", {
      GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? `présente (${process.env.GOOGLE_PRIVATE_KEY.length} chars)` : "manquante",
      CALENDAR_ID: process.env.CALENDAR_ID || "primary (défaut)",
    });

    // Réponse client (plus riche en dev)
    const isDev = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: "Échec de la création du rendez-vous",
        message: isDev ? error.message : "Erreur serveur interne",
        debugInfo: isDev ? {
          code: error.code,
          googleResponse: error.response?.data,
          fullError: error.toString(),
        } : undefined,
      },
      { status: 500 }
    );
  }
}