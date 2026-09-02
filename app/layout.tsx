import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shahnewaz Ali Mohammad | Full-Stack Developer",
  description: "Portfolio of Shahnewaz Ali Mohammad, a full-stack web developer building modern web and agentic AI applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>;
}
