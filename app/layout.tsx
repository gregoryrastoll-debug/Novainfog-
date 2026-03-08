import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";  // ← Import de la Navbar
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
        {/* Navbar fixe en haut */}
        <Navbar />

        {/* Contenu principal avec padding pour laisser de la place au navbar */}
        <main className="pt-20">
          {children}
        </main>

        {/* Toaster adapté au fond sombre */}
        <Toaster
          richColors
          position="top-right"
          closeButton
          theme="dark"
          duration={5000}
          toastOptions={{
            classNames: {
              toast: "bg-zinc-900 border border-zinc-700 text-zinc-100",
              title: "text-zinc-100 font-semibold",
              description: "text-zinc-400",
            },
          }}
        />
      </body>
    </html>
  );
}