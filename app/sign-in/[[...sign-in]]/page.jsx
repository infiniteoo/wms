import React from "react";
import { SignIn } from "@clerk/nextjs";
import "./Page.css"; // Import your CSS file

export default function Page() {
  return (
    <div className="flex">
      {/* Background Image */}
      <div className="background-container">
        <img
          className="responsive-image  rounded-2xl ml-1 mr-2 pr-2"
          src="/GreatBlue.png"
          alt="Background"
        />
      </div>

      {/* SignIn Component */}
      <div className="flex-grow">
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
