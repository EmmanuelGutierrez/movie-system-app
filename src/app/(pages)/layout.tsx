import { Footer } from "../../components/common/Footer";
import { Header } from "../../containers/common/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-(--spacing(80)))] min-w-full">
        {children}
      </div>
      <Footer/>
    </div>
  );
}
