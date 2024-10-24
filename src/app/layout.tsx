import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/home/Header/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Distribuidores Cedar",
  description: "Aplicación de gestion de inventario para distribuidores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
