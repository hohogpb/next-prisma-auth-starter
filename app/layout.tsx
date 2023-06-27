import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "next-prisma-auth-starter",
  description: "An example site of how to do auth in next.js with prisma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`inter.className h-full`}>{children}</body>
    </html>
  );
}
