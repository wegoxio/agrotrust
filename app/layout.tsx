import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${inter.className} flex min-h-full flex-col overflow-x-hidden bg-neutral text-secondary`}
      >
        {children}
      </body>
    </html>
  );
}
