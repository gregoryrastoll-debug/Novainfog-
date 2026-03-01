import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          antialiased
          bg-zinc-950
          text-zinc-100
          min-h-screen
        `}
      >
        {children}
        <Toaster
          richColors
          position="top-right"
          closeButton
          theme="dark"
          duration={5000}
        />
      </body>
    </html>
  );
}