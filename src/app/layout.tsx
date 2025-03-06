import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ApolloProviderWrapper from "@/lip/ApolloProviderWrapper";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search Pokémon - Find Pokémon Details Easily",
  description: "A Next.js application that allows you to search for Pokémon details, including types, attacks, and evolutions, using GraphQL API.",
  keywords: ["Pokémon", "Pokémon Search", "GraphQL", "Next.js", "Pokédex"],
  authors: [{ name: "Bainary", url: "https://search-pokemon-six-rose.vercel.app" }],
  openGraph: {
    title: "Search Pokémon - Find Your Favorite Pokémon",
    description:
      "Search for Pokémon details, attacks, and evolutions with an optimized Next.js app powered by GraphQL.",
    url: "https://search-pokemon-six-rose.vercel.app",
    siteName: "Search Pokémon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Pokémon",
    description:
      "Find Pokémon details, attacks, and evolutions with this Next.js GraphQL-powered app.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<></>}>
          <ApolloProviderWrapper>
            <AntdRegistry>{children}</AntdRegistry>
          </ApolloProviderWrapper>
        </Suspense>
      </body>
    </html>
  );
}
