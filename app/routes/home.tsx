import type { Route } from "./+types/home";
import Main from "~/components/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Main />
    </>
  );
}
