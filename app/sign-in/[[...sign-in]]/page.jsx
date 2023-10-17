import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="justify-center flex flex-row items-center">
      <SignIn />;
    </div>
  );
}
