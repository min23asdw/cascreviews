import { Box } from "@mui/system";
import Image from "next/image";
import UniversitiesPage from "./university/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 300,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>setup mui</Box>
          <Box
            sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}
          >
            ok
          </Box>

          <div className=" bg-slate-400">
            tailwindcss <div className=" text-5xl">work</div>
          </div>

          <UniversitiesPage/>
        </Box>
      </div>
    </main>
  );
}
