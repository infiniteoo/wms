import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex">
      {/* Background Image */}
      <div
        className="flex-grow bg-left  "
        style={{
          backgroundImage: `url('/gb-splash.png')`,
          width: "100%", // Adjust the width as needed
          height: "100vh", // Adjust the height as needed
        }}
      ></div>

      {/* SignIn Component */}
      <div className="flex-grow">
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
