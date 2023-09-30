import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header className="w-full z-10">
        <div className="container flex justify-between mx-auto py-3 w-4/5 max-w-screen-lg ">
          <Link href="/">
            <h1>
              <Image
                className="w-44 sm:w-auto"
                src="/3Dsakutto-trans.png"
                height={100}
                width={266}
                alt="手軽に3Dサイトを導入する-サクッと3D-"
              ></Image>
            </h1>
          </Link>
          <nav className="flex items-center">
            <ul className="flex items-center">
              <li>
                <Link href="/contact">
                  <button
                    type="button"
                    className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="m-0 sm:w-3.5 h-3.5 text-white sm:mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                    <div className="hidden sm:block">お問い合わせ</div>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
