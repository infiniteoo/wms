import { Exo } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const exo = Exo({ subsets: ["latin"] });

export const metadata = {
  title: "Great Blue - WMS 2023",
  description: "Warehouse Management Without the Fluff",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={exo.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
