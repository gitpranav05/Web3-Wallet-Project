import React, { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { FaWallet } from "react-icons/fa";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // ✅ 2. Update DOM + localStorage when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="  py-4 flex justify-between">
      <div className="flex gap-4 text-[#f4409e]">
        <h1 className="text-5xl flex gap-5 font-bold">Aas-3 </h1>
        <div className="text-2xl  py-4.5 ">
          <FaWallet />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setDarkMode(!darkMode);
          }}
          className="text-3xl py-2 dark:text-white text-black transition-all duration-500 hover:cursor-pointer"
        >
          {darkMode ? <CiLight /> : <CiDark />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
