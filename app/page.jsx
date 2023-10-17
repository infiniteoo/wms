import { UserButton } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <div >
     
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}