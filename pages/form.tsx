import { useRouter } from "next/router";
import { Header } from "../components/global/Header/Index";
import { Footer } from "../components/global/Footer/Index";

export default function Form() {
  const router = useRouter();

  const registerUser = async (event) => {
    event.preventDefault();

    const res = await fetch("/lib/sendmail", {
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        message: event.target.message.value,
        company: event.target.company.value,
        phoneNumber: event.target.phoneNumber.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (res.status === 200) {
      console.log("Successfully registered user, redirecting...");
      router.push("/thanks");
    } else {
      console.log(`Failed to register user, status code: ${res.status}`);
    }
  };

  return (
    <>
      <main className="">
        <Header />
        <div className="">
          <section className="h-96 bg-[url('/tag-back.jpg')] bg-cover">
            <div className="container h-full w-4/5 mx-auto max-w-screen-lg">
              <div className="h-full w-full flex items-center">
                <div>
                  <h2 className="text-stone-50 text-3xl mb-5 font-bold tracking-wide">
                    -お問い合わせ-
                  </h2>
                </div>
              </div>
            </div>
          </section>
          <div className="container mx-auto w-4/5 max-w-screen-lg py-20">
            <div className="">
              以下のフォームよりお気軽にお問い合わせください。
              <br />
              お問い合わせ内容の確認後、ご連絡させていただきます。
            </div>
            <div className="container my-24 ">
              <form onSubmit={registerUser}>
                <div className="py-10 block justify-between border-solid border-b border-gray-300 sm:flex">
                  <label
                    htmlFor="company"
                    className="w-full inline-block sm:w-1/3"
                  >
                    御社名
                    <span className="bg-cyan-600 text-slate-50 text-xs rounded-sm p-1 ml-2 align-text-top">
                      必須
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="form-control px-3 py-1 w-full shadow-md mt-2 sm:w-1/2 sm:mt-0"
                    placeholder="株式会社〇〇〇〇"
                  />
                </div>
                <div className="py-10 block justify-between border-solid border-b border-gray-300 sm:flex">
                  <label
                    htmlFor="name"
                    className="w-full inline-block sm:w-1/3"
                  >
                    氏名
                    <span className="bg-cyan-600 text-slate-50 text-xs rounded-sm p-1 ml-2 align-text-top">
                      必須
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-control px-3 py-1 w-full shadow-md mt-2 sm:w-1/2 sm:mt-0"
                    placeholder="山田太郎"
                  />
                </div>
                <div className="py-10 block justify-between border-solid border-b border-gray-300 sm:flex">
                  <label
                    htmlFor="position"
                    className="w-full inline-block sm:w-1/3"
                  >
                    役職
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    className="form-control px-3 py-1 w-full shadow-md mt-2 sm:w-1/2 sm:mt-0"
                    placeholder="代表取締役"
                  />
                </div>
                <div className="py-10 block justify-between border-solid border-b border-gray-300 sm:flex">
                  <label
                    htmlFor="phoneNumber"
                    className="w-full inline-block sm:w-1/3"
                  >
                    電話番号
                    <span className="bg-cyan-600 text-slate-50 text-xs rounded-sm p-1 ml-2 align-text-top">
                      必須
                    </span>
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className="form-control px-3 py-1 w-full shadow-md mt-2 sm:w-1/2 sm:mt-0"
                    placeholder="080xxxxxxxx"
                  />
                </div>
                <div className="py-10 block justify-between border-solid border-b border-gray-300 sm:flex">
                  <label
                    htmlFor="email"
                    className="w-full inline-block sm:w-1/3"
                  >
                    メールアドレス
                    <span className="bg-cyan-600 text-slate-50 text-xs rounded-sm p-1 ml-2 align-text-top">
                      必須
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-control px-3 py-1 w-full shadow-md mt-2 sm:w-1/2 sm:mt-0"
                    placeholder="example@email.com"
                  />
                </div>

                <div className="py-10 block justify-between border-solid border-b border-gray-300 items-center sm:flex">
                  <label
                    htmlFor="message"
                    className="w-full inline-block sm:w-1/3"
                  >
                    お問い合わせ内容
                    <span className="bg-cyan-600 text-slate-50 text-xs rounded-sm p-1 ml-2 align-text-top">
                      必須
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="form-control px-3 py-1 w-full shadow-md mt-2 sm:w-1/2 sm:mt-0"
                    rows={4}
                  ></textarea>
                </div>
                <div className="mb-3 text-center mt-10">
                  <button
                    type="submit"
                    className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-300"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
