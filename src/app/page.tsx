"use client";
import { Box } from "@mui/system";
import Image from "next/image";
import UniversitiesPage from "./university/page";
import LoginSection from "./component/login";
import RegisterSection from "./component/register";
import useAuth from "./utils/useAuth";
import GenerateLink from "./component/genlink";

export default function Home() {
  const role = useAuth.getRole();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" ">
        <div className="flex flex-col gap-4">
          <LoginSection />
          <RegisterSection />
        </div>
        {/* <button onClick={()=>{test}}>test</button> */}
        <div>ROLE: {role}</div>
        <GenerateLink/>
        <div className="h-[50vh] flex items-end">
        <UniversitiesPage />
        </div>
         
      </div>
    </main>
  );
}
