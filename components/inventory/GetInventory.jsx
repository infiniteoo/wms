"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function GetInventory() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: inventory } = await supabase.from("inventory").select();

  return (
    <ul className="my-auto text-foreground">
      {inventory?.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}