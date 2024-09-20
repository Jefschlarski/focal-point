import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import "./globals.scss";

export const metadata: Metadata = {
  title: "FocalPoint - Todo",
  description: "todo app",
};

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={interTight.className} suppressHydrationWarning={true}>
          <div className="app-container">
            {children}
          </div>
      </body>
    </html>
  );
}
