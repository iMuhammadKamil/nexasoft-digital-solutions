import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexaSoft Solutions – Custom Software Development & IT Services",
  description:
    "NexaSoft Solutions Limited delivers custom software development, web applications, mobile apps, cloud solutions, and IT consulting services for businesses worldwide. Registered in Hong Kong.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "IT consulting",
    "NexaSoft",
    "custom software",
    "SaaS",
  ],
  authors: [{ name: "NexaSoft Solutions Limited" }],
  openGraph: {
    title: "NexaSoft Solutions – Custom Software Development & IT Services",
    description:
      "Professional software development, cloud solutions, and IT consulting services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
