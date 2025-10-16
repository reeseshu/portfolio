import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import MouseTrailCanvas from "@/components/MouseTrailCanvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reese Shu - Software Engineer",
  description: "Software engineer specializing in building exceptional digital experiences",
  keywords: ["software engineer", "web developer", "react", "javascript", "portfolio"],
  authors: [{ name: "Reese Shu" }],
  openGraph: {
    title: "Reese Shu - Software Engineer",
    description: "Software engineer specializing in building exceptional digital experiences",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reese Shu - Software Engineer",
    description: "Software engineer specializing in building exceptional digital experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#10b981" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <MouseTrailCanvas />
          {children}
        </Providers>
      </body>
    </html>
  );
}
