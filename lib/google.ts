import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export const getCalendarClient = async () => {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || "";

  // Étape 1 : gérer les \\n littéraux (cas le plus fréquent sur Vercel)
  privateKey = privateKey.replace(/\\n/g, "\n");

  // Étape 2 : enlever les guillemets si Vercel les a ajoutés autour
  privateKey = privateKey.replace(/^"|"$/g, "");

  // Étape 3 : nettoyer les espaces inutiles / retours chariot Windows
  privateKey = privateKey.trim().replace(/\r/g, "");

  // Étape 4 (optionnel mais utile pour debug) : reconstruction si headers manquants
  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
  }

  // Debug (à laisser temporairement pour voir ce que Vercel reçoit vraiment)
  console.log("[DEBUG] GOOGLE_PRIVATE_KEY length:", privateKey.length);
  console.log("[DEBUG] Starts with:", privateKey.substring(0, 40));
  console.log("[DEBUG] Contains real newline:", privateKey.includes("\n"));
  console.log("[DEBUG] Contains \\n literal:", privateKey.includes("\\n"));

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
    scopes: SCOPES,
  });

  return google.calendar({ version: "v3", auth });
};