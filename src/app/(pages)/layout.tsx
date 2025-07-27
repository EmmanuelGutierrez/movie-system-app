import { Header } from "../components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-(--spacing(16)))] min-w-full">
        {children}
      </div>
    </div>
  );
}
