import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar — Interactive Date Planner",
  description:
    "A beautiful interactive wall calendar with date range selection, festival markers, personal notes, and Hindu/Muslim/National holiday awareness.",
  keywords: [
    "wall calendar", "interactive calendar", "date range selector",
    "Hindu festivals", "Ekadashi", "Muslim holidays", "Next.js calendar"
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Wall Calendar",
    description: "Interactive wall calendar with festivals, notes and date range selection.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}