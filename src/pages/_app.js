import Footer from "@/components/footer/Footer";
import "@/styles/globals.css";
import localFont from "next/font/local";

const sohneTest = localFont({
  src: "./fonts/Test web fonts (WOFF2)/test-soehne-buch.woff2",
  variable: "--font-sohne-test",
  weight: "500",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${sohneTest.className} font-sans`}>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
