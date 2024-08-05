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
    <main className="  min-h-screen     ">
      <div className="  p-24">
    
        <div>ROLE: {role}</div>
        <GenerateLink />
      </div>
      <div className="h-[60vh]   p-4 bg-red-500 mx-auto ">
        <UniversitiesPage />
      </div>
    </main>
  );
}
