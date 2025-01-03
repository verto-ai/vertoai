import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import AppWalletProvider from "./components/AppWalletProvider";

export const metadata: Metadata = {
  title: "Verto AI",
  description: "Verto AI, Your Blockchain Agentic Assistant",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppWalletProvider>{children}</AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
