import "./layout.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xmartlabs Template",
  description: "Web site created with NextJS",
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
