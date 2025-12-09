import type { Route } from "./+types/home";
import Main from "~/components/main";
import { Loading } from "~/components/loading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ params }: Route.ClientActionArgs) {
  const res = await fetch("http://localhost:3000/critters");
  return await res.json();
}

export function HydrateFallback() {
  return <Loading />;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Main crittersArray={loaderData} />
    </>
  );
}
