import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getDatabase } from "../lib/notion";
import { Header } from "../components/global/Header/Index";
import { Footer } from "../components/global/Footer/Index";
import { Article } from "../components/page/Article/Index";
import { useState } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const filteredPosts = posts.filter((post) =>
    post.properties.Name.title[0].plain_text
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="h-full">
      <main className="h-full">
        <Header />
        <section className="h-3/5 ">
          <div className="h-3/5 w-full bg-[url('/3Dtop.jpg')] bg-cover -z-10 absolute opacity-40"></div>
          <div className="h-full flex items-center justify-center mx-auto w-4/5">
            <div>
              <p className="font-semibold text-2xl text-center mt-24 break-keep">
                「サクッと3D」は、 3Dサイトを 手軽に導入するための
                <br />
                手段をまとめたサイトです。
              </p>
              <div className="flex justify-center mt-8">
                <Image
                  src="/search.png"
                  height={20}
                  width={30}
                  alt="検索"
                ></Image>
                <input
                  type="text"
                  placeholder="記事を検索する"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="z-10 ml-5 px-3 py-1 shadow-md shadow-gray-500 rounded-sm"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="">
            <ol className="flex flex-wrap container mx-auto w-4/5 max-w-screen-lg gap-x-6 gap-y-8 box-border py-10">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => {
                  return (
                    <Article
                      key={post.properties.Name.title[0].plain_text}
                      title={post.properties.Name.title[0].plain_text}
                      tag={post.properties.Tags.multi_select[0].name}
                      tagLink={`/${post.properties.Tags.multi_select[0].name}`}
                      slug={`/${post.properties.Tags.multi_select[0].name}/${post.properties.Name.title[0].plain_text}`}
                    />
                  );
                })
              ) : (
                <div className="w-full">
                  <p className="text-center">
                    お探しの記事は見つかりませんでした。
                  </p>
                </div>
              )}
            </ol>
            <div className="text-center pb-24 pt-10">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  disabled={currentPage === index + 1}
                  style={{
                    border: "1px solid #ccc",
                    width: "20px",
                    marginLeft: "3px",
                    marginRight: "3px",
                    backgroundColor:
                      currentPage === index + 1 ? "#333" : "transparent",
                    color: currentPage === index + 1 ? "white" : "black",
                  }}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
  };
};
