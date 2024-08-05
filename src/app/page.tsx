"use client";
import { Box } from "@mui/system";
import Image from "next/image";
import UniversitiesPage from "./university/page";
import LoginSection from "./component/login";
import RegisterSection from "./component/register";
import useAuth from "./utils/useAuth";
import GenerateLink from "./component/genlink";
import { useEffect, useState } from "react";

export interface IUniversity {
  _id: string;
  university_id: string;
  university_name: string;
}
export default function Home() {
  const role = useAuth.getRole();
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const host = process.env.BE;
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${host}/universities`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUniversities(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);
  return (
    <main className="  min-h-screen     ">
      <div className="  p-24">
        <div>ROLE: {role}</div>
        <div className="mx-auto h-[20vh]">
          <GenerateLink universities={universities} loading={loading} />
        </div>
      </div>
      <div className="h-[60vh]   p-4 bg-red-500 mx-auto ">
        <UniversitiesPage universities={universities} loading={loading} />
      </div>
    </main>
  );
}
