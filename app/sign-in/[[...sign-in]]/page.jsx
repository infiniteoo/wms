import React from 'react';
import { SignIn } from "@clerk/nextjs";


export default function Page() {
  return (
    
      <div className="flex justify-center items-center ml-2">
        <SignIn />
      </div>
    
  );
}
