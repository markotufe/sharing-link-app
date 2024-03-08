import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { NavigationBar } from "@/components/NavigationBar";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  adjustFontFallback: false,
  display: "swap"
});

export const metadata: Metadata = {
  title: "devlinks",
  description: "share your generated links"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-lightGrey ${instrumentSans.className}`}>
        <main className="min-h-screen">
          <header className="pt-5 mx-5">
            <NavigationBar />
          </header>

          {children}
        </main>
      </body>
    </html>
  );
}
