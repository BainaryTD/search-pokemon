import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ApolloProviderWrapper from "@/lip/ApolloProviderWrapper";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Search Pokémon - Find Pokémon Details Easily",
  description: "A Next.js application that allows you to search for Pokémon details, including types, attacks, and evolutions, using GraphQL API.",
  keywords: ["Pokémon", "Pokémon Search", "GraphQL", "Next.js", "Pokédex"],
  authors: [{ name: "Bainary", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Search Pokémon - Find Your Favorite Pokémon",
    description:
      "Search for Pokémon details, attacks, and evolutions with an optimized Next.js app powered by GraphQL.",
    url: "https://yourapp.vercel.app",
    siteName: "Search Pokémon",
    images: [
      {
        url: "https://yourapp.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pokémon Search Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Pokémon",
    description:
      "Find Pokémon details, attacks, and evolutions with this Next.js GraphQL-powered app.",
    images: [""],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProviderWrapper>
          <AntdRegistry>{children}</AntdRegistry>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
