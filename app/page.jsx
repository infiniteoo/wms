import { UserButton } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <div className="flex justify-center flex-row">
     
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}