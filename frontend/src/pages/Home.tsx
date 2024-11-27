import { Outlet } from "react-router";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <Outlet />
    </main>
  );
}
