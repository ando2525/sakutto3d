import Head from "next/head";
import { getDatabase, getPostsByCategory } from "../../lib/notion";
import Link from "next/link";
import { databaseId } from "../index";
import { Header } from "../../components/global/Header/Index";
import { Footer } from "../../components/global/Footer/Index";
import { Article } from "../../components/page/Article/Index";
import Image from "next/image";
import { GetStaticProps } from "next";

export default function Category({ page }) {
  if (!page) {
    return <div />;
  }
  return (
    <div>
      <Header />
      <article className="w-100">
        <section className="h-96 bg-[url('/tag-back.jpg')] bg-cover">
          <div className="container h-full w-4/5 mx-auto max-w-screen-lg">
            <div className="h-full w-full flex items-center">
              <div>
                <h2 className="text-stone-50 text-3xl mb-5 font-bold tracking-wide">
                  {page[0].properties.Tags.multi_select[0].name}の記事一覧
                </h2>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto w-4/5 max-w-screen-lg mt-2">
          {page[0].properties.Tags.multi_select.map((tag, index) => (
            <div key={index} className="inline  text-sm opacity-60 ">
              <span className="underline px-1">HOME</span> /
              <span className="px-1">{tag.name}</span>/
            </div>
          ))}
        </div>
        <section>
          <div>
            <ol
              className="flex flex-wrap 
            container mx-auto w-4/5 max-w-screen-lg gap-x-6 gap-y-8 box-border py-12"
            >
              {page.map((post) => {
                return (
                  <Article
                    key={post.properties.Name.title[0].plain_text}
                    title={post.properties.Name.title[0].plain_text}
                    tag={post.properties.Tags.multi_select[0].name}
                    tagLink={`/${post.properties.Tags.multi_select[0].name}`}
                    slug={`/${post.properties.Tags.multi_select[0].name}/${post.properties.Name.title[0].plain_text}`}
                  />
                );
              })}
            </ol>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const database = await getDatabase(databaseId);
//   const allTags = database
//     .map((post) => post.properties.Tags.multi_select)
//     .reduce((acc, tags) => acc.concat(tags), [])
//     .filter((tag, index, self) => self.indexOf(tag) === index);
//   return {
//     paths: allTags.map((tag) => ({ params: { tag: tag.name } })),
//     fallback: true,
//   };
// };
export const getStaticProps: GetStaticProps = async (context) => {
  const { tag } = context.params;
  const page = await getPostsByCategory(databaseId, tag);
  return {
    props: {
      page,
    },
  };
};
export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);

  const allTags = [];

  for (const post of database) {
    if ("properties" in post) {
      const tagsProperty = post.properties.Tags;

      if (tagsProperty.type === "multi_select") {
        const tags = tagsProperty.multi_select;
        allTags.push(...tags);
      }
    }
  }

  const uniqueTags = allTags.filter(
    (tag, index, self) => self.indexOf(tag) === index
  );

  return {
    paths: uniqueTags.map((tag) => ({ params: { tag: tag.name } })),
    fallback: true,
  };
};
