import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNS Diagnosis",
  description: "Diagnose your SNS usage habits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="container">
          <h1>SNS Diagnosis</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
