import dynamic from "next/dynamic";

const DynamicThreeComponent = dynamic(
  () => import("../components/page/example/example"),
  {
    ssr: false,
  }
);

export default function Example() {
  return <DynamicThreeComponent />;
}
