import { Header } from "../components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="h-screen">
        <div className="">{children}</div>
      </div>
    </div>
  );
}
