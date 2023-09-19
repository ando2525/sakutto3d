import { Header } from "../components/global/Header/Index";
import { Footer } from "../components/global/Footer/Index";
import { Head } from "next/document";
import Link from "next/link";

export default function Thanks() {
  return (
    <>
      <div className="h-full">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="">
            <div className="h-full text-center">
              お問い合わせありがとうございます。
              <br />
              48時間以内にお返事致しますので、しばらくお待ちください。
            </div>
            <div className="text-center mt-10">
              <Link
                href="/"
                className="pt-3 pb-0.5 py-1 border-stone-600 border-b-2"
              >
                トップページ
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
