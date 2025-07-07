import './global.css'
import React, { ReactElement, ReactNode } from "react";
import {Metadata} from "next";
import { Roboto } from "next/font/google"

interface RootLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "PoetryHub - A Community for Poets",
    description: "Share, discover, and celebrate poetry with a vibrant community of writers.",
}

export default function RootLayout({ children }: RootLayoutProps): ReactElement {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}