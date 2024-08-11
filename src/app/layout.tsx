import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mintmatica.com - abstract artwork, NFT's and random digital artifacts.",
  description: "Marketplace for digital artwork, NFT's, photography, and other interesting assets.",
  openGraph: {
    title: "Mintmatica.com - abstract artwork, NFT's and random digital artifacts.",
    description: "Marketplace for digital artwork, NFT's, photography, and other interesting assets.",
    images: ["./android-chrome-512x512.png"],
  },
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
