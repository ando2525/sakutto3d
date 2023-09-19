import Image from "next/image";
import { Fragment } from "react";
import Head from "next/head";
import {
  getDatabase,
  getPageTitle,
  getBlocks,
  getUUIDFromSlug,
} from "../../../lib/notion";
import Link from "next/link";
import { databaseId } from "../../index";
import styles from "../../post.module.scss";
import { Header } from "../../../components/global/Header/Index";
import { Footer } from "../../../components/global/Footer/Index";
import { Sidebar } from "../../../components/page/sidebar/Index";

const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className="border-l-8 border-cyan-700 pl-6 py-2 text-3xl mt-12 mb-4 font-bold">
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="mt-10 mb-1 font-bold text-xl">
          <Text text={value.rich_text} />
        </h3>
      );
    case "heading_3":
      return (
        <h3 className="mt-10 mb-2 font-bold text-xl">
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return <ul>{value.children.map((child) => renderBlock(child))}</ul>;
    }
    case "numbered_list": {
      return <ol>{value.children.map((child) => renderBlock(child))}</ol>;
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{value.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} className="py-3 px-2" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      );
    case "table": {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child, i) => {
              const RowElement =
                value.has_column_header && i == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className={styles.row}>
          {block.children.map((block) => renderBlock(block))}
        </div>
      );
    }
    case "column": {
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function Post({ page, blocks }) {
  const tagName = page?.properties?.Tags?.multi_select?.[0]?.name;
  const link =
    tagName === "基礎知識"
      ? "/基礎知識/無料＆著作権フリーで使える3Dモデルサイト"
      : tagName === "Spline"
      ? "Spline/Splineのオブジェクトパネルについて学ぶ"
      : "/R3F/React-Three-Fiberの導入方法";
  const source =
    tagName === "基礎知識"
      ? "/kiso.jpg"
      : tagName === "Spline"
      ? "/spline.jpg"
      : "/R3F.jpg";
  const title =
    tagName === "基礎知識"
      ? "無料＆著作権フリーで使える3Dモデルサイト"
      : tagName === "Spline"
      ? "Splineのオブジェクトパネルについて学ぶ"
      : "React-Three-Fiberの導入方法";
  const link2 =
    tagName === "基礎知識"
      ? "/基礎知識/3Dデータのファイル形式はどれがいい？"
      : tagName === "Spline"
      ? "/spline/Splineのプロパティパネルについて学ぶ"
      : "/R3F/【R3F】より魅せる！おすすめコンポーネント①";
  const title2 =
    tagName === "基礎知識"
      ? "3Dデータのファイル形式はどれがいい？"
      : tagName === "Spline"
      ? "Splineのプロパティパネルについて学ぶ"
      : "【R3F】より魅せる！おすすめコンポーネント①";
  const link3 =
    tagName === "基礎知識"
      ? "/基礎知識/3Dデータの表示速度を向上させるために知っておくべきこと"
      : tagName === "Spline"
      ? "/spline/Splineのツールバーについて学ぶ"
      : "/R3F/【R3F】より魅せる！おすすめコンポーネント②";
  const title3 =
    tagName === "基礎知識"
      ? "3Dデータの表示速度を向上させるために知っておくべきこと"
      : tagName === "Spline"
      ? "Splineのツールバーについて学ぶ"
      : "【R3F】より魅せる！おすすめコンポーネント②";

  if (!page || !blocks) {
    return <div />;
  }
  return (
    <div>
      <Header />
      <main className="w-100">
        <section className="h-96 bg-[url('/3D-back.jpg')] bg-cover">
          <div className="container h-full w-4/5 mx-auto max-w-screen-lg">
            <div className="h-full w-full flex items-center">
              <div>
                <h2 className="text-stone-50 text-3xl mb-5 font-bold">
                  <Text text={page.properties.Name.title} />
                </h2>
                <div className="flex">
                  {page.properties.Tags.multi_select.map((tag, index) => (
                    <div
                      key={index}
                      className="inline bg-stone-50 py-1 px-3 mr-3 text-cyan-700 text-sm font-bold"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto w-4/5 max-w-screen-lg mt-2">
          {page.properties.Tags.multi_select.map((tag, index) => (
            <div key={index} className="inline  text-sm opacity-60 ">
              <span className="underline px-1">HOME</span> /
              <span className="underline px-1">{tag.name}</span>/
              <span className="px-1">
                {page.properties.Name.title[0]?.plain_text || "Unknown title"}
              </span>
            </div>
          ))}
        </div>
        <section className="container mx-auto w-4/5 py-24 max-w-screen-lg">
          <div className="block md:flex">
            <div className="pb-24 flex-1 leading-8 tracking-tight md:pb-0">
              {blocks.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
              <div className="text-center mt-10 hover:opacity-60">
                <Link
                  href={`/${page.properties.Tags.multi_select[0].name}`}
                  className="border border-stone-600 py-3 px-6 w-1/3"
                >
                  他の{page.properties.Tags.multi_select[0].name}の記事を見る
                </Link>
              </div>
              <div className="text-center mt-8 hover:opacity-60">
                <Link
                  href="/"
                  className="pt-3 pb-0.5 py-1 border-stone-600 border-b-2"
                >
                  トップページ
                </Link>
              </div>
            </div>
            {tagName && (
              <Sidebar
                tag={tagName}
                link={link}
                source={source}
                title={title}
                link2={link2}
                title2={title2}
                link3={link3}
                title3={title3}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);

  const paths = database.flatMap((post) => {
    if (
      "properties" in post &&
      "Tags" in post.properties &&
      post.properties.Tags.type === "multi_select" &&
      "Name" in post.properties &&
      post.properties.Name.type === "title"
    ) {
      const tags = post.properties.Tags.multi_select;
      const title = post.properties.Name.title;

      if (Array.isArray(title) && title.length > 0) {
        return tags.map((tag) => ({
          params: {
            tag: tag.name,
            slug: title[0].plain_text,
          },
        }));
      }
    }
    return [];
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const database = await getDatabase(databaseId);
  const uuid = await getUUIDFromSlug(slug, database);

  if (!uuid) {
    return { notFound: true };
  }

  const page = await getPageTitle(uuid);
  const blocks = await getBlocks(uuid);

  return {
    props: {
      page,
      blocks,
    },
  };
};
