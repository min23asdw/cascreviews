"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginSection from "./login";
import RegisterSection from "./register";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<
    "login" | "register" | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center relative">
          <div className="text-white text-2xl">University Reviews</div>
          <div className="flex space-x-4 relative">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setActiveSection("login")}
                  className="text-white hover:underline relative"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveSection("register")}
                  className="text-white hover:underline relative"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            )}
            {activeSection === "login" && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black p-4 shadow-lg z-10">
                <LoginSection />
              </div>
            )}
            {activeSection === "register" && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black p-4 shadow-lg z-10">
                <RegisterSection />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
