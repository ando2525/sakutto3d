import Image from "next/image";
import Link from "next/link";
import styles from "./Index.module.scss";

export function Article(props) {
  let imageName;

  if (props.tag === "基礎知識") {
    imageName = "/kiso.jpg";
  } else if (props.tag === "React-Three-Fiber") {
    imageName = "/R3F.jpg";
  } else if (props.tag === "Spline") {
    imageName = "/spline.jpg";
  } else {
    imageName = "/default.jpg";
  }
  return (
    <>
      <li className={styles.box}>
        <Link href={props.slug}>
          <div className="w-full h-44 overflow-hidden">
            <Image
              src={imageName}
              alt={props.tag}
              width={500}
              height={260}
              className="object-cover h-full"
            />
          </div>
          <h2 className="h-20 font-bold text-lg leading-snug py-6 overflow-hidden">
            {props.title}
          </h2>
        </Link>
        <div className="flex-1"></div>
        <Link href={props.tagLink}>
          <div>
            <div className="px-4 py-0.5 rounded-sm bg-slate-700 text-cyan-50 inline-block text-sm">
              {props.tag}
            </div>
          </div>
        </Link>
        <Link href={props.slug}>
          <div>Read post →</div>
        </Link>
      </li>
    </>
  );
}
