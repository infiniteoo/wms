import { UserButton } from "@clerk/nextjs";
import { Dashboard } from "../components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-row p-2 border-red-500 ">
      <Dashboard />
    {/*   <UserButton afterSignOutUrl="/" /> */}
    </div>
  );
}
