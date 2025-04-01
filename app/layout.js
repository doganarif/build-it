import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { getServerSession } from "@/lib/auth";
import { ClientProviders } from "./ClientProviders.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BuildIt - Next.js Boilerplate",
  description: "A comprehensive Next.js boilerplate with Auth.js, Prisma, Stripe, and Tailwind CSS",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientProviders>
          <Navbar user={session?.user} />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 border-t bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} BuildIt. All rights reserved.
              </p>
            </div>
          </footer>
        </ClientProviders>
      </body>
    </html>
  );
}
