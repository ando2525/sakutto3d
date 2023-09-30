import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer>
        <div className="w-full bg-neutral-900 py-12">
          <div className="py-2 text-center">
            <div>
              <Image
                className="mx-auto"
                src="/3Dsakutto-logo.png"
                height={100}
                width={106}
                alt="logo"
              ></Image>
            </div>
          </div>
          <nav className="flex items-center justify-center py-6">
            <ul className="items-center text-white sm:flex">
              <li className="text-center sm:mr-14">
                <Link href="/">トップページ</Link>
              </li>
              {/* <li className="text-center mt-6 sm:mr-14 sm:mt-0">
                当サイトについて
              </li> */}
              <li className="text-center mt-6 sm:mt-0">
                <Link href="/contact">お問い合わせ</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bg-neutral-900 text-white text-center py-3">
          <div className="opacity-30">@Nextride All Rights Reserved.</div>
        </div>
      </footer>
    </>
  );
}
