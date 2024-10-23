import "./globals.css";
import {Inter} from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans overflow-x-hidden bg-white  `}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
