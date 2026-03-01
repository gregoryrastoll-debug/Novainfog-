import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export const getCalendarClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
    scopes: SCOPES,
  });

  return google.calendar({ version: "v3", auth });
};