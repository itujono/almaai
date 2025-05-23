import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });

export const metadata: Metadata = {
  title: "Alma AI",
  description: "Alma AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NuqsAdapter>
          <div className="root">{children}</div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
