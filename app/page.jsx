import { UserButton } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
import { Dashboard } from "../components/Dashboard";
import Image from "next/image";
import logo from '../public/gb2.png'

export default function Home() {
  return (
    <div className="flex flex-row justify-between p-2 w-100 h-100">
      <Dashboard />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
