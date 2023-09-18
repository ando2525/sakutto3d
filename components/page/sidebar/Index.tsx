import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";
import { useState } from "react";

export function Sidebar(props) {
  return (
    <>
      <div className="w-full ml-0 h-50 md:w-64  md:ml-16">
        <div className="text-center bg-slate-700 py-1 mb-6 text-white font-bold">
          {props.tag}おすすめ記事
        </div>
        <li className="w-full shadow-md bg-white list-none p-2 mt-3 ">
          <Link href={props.link}>
            <div className="w-full h-28 overflow-hidden">
              <Image
                src={props.source}
                width={600}
                height={200}
                className="object-cover h-full"
                alt="サムネイル"
              />
            </div>
            <h2 className="h-16 font-bold text-lg leading-snug py-3 overflow-hidden">
              {props.title}
            </h2>
            <div className="flex-1"></div>
            <div>
              <div className="px-4 py-0.5 rounded-sm bg-slate-700 text-cyan-50 inline-block text-sm">
                {props.tag}
              </div>
            </div>
            <div>Read post →</div>
          </Link>
        </li>
        <li className="w-full shadow-md bg-white list-none p-2 mt-3 ">
          <Link href={props.link2}>
            <div className="w-full h-28 overflow-hidden">
              <Image
                src={props.source}
                width={600}
                height={200}
                className="object-cover h-full"
                alt="サムネイル"
              />
            </div>
            <h2 className="h-16 font-bold text-lg leading-snug py-3 overflow-hidden">
              {props.title2}
            </h2>
            <div className="flex-1"></div>
            <div>
              <div className="px-4 py-0.5 rounded-sm bg-slate-700 text-cyan-50 inline-block text-sm">
                {props.tag}
              </div>
            </div>

            <div>Read post →</div>
          </Link>
        </li>
        <li className="w-full shadow-md bg-white list-none p-2 mt-3 ">
          <Link href={props.link3}>
            <div className="w-full h-28 overflow-hidden">
              <Image
                src={props.source}
                width={600}
                height={200}
                className="object-cover h-full"
                alt="サムネイル"
              />
            </div>
            <h2 className="h-16 font-bold text-lg leading-snug py-3 overflow-hidden">
              {props.title3}
            </h2>
            <div className="flex-1"></div>
            <div>
              <div className="px-4 py-0.5 rounded-sm bg-slate-700 text-cyan-50 inline-block text-sm">
                {props.tag}
              </div>
            </div>

            <div>Read post →</div>
          </Link>
        </li>
        <div className="text-center bg-slate-700 py-1 mb-6 mt-10 text-white font-bold">
          タグ一覧
        </div>
        <div>
          <ul className="list-disc pl-4">
            <li>
              <Link href="/基礎知識">基礎知識</Link>
            </li>
            <li>
              <Link href="/React-Three-Fiber">React-Three-Fiber</Link>
            </li>
            <li>
              <Link href="/Spline">Spline</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
