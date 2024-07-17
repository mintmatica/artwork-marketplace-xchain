import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Marketplace for AI Tools, AI Agents, Automation Scripts and NFT Artwork",
  description: "The latest AI tools, AI agents, automation scripts and NFT artwork available from Pantaleone.net. Subscribe or pay with crypto, credit or debit card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: "30px" }}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
