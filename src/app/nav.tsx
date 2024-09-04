import Link from "next/link";
import React from "react";

const NavigationBar = () => {
  return (
    <nav className="p-2 pt-4">
      <ul className="flex gap-2 justify-end">
        <li>
          <Link
            href="/createinventory"
            className="inline-flex font-bold items-center justify-center px-1 py-1 w-[123px] text-sm min-[480px]:text-base min-[480px]:w-[200px] min-[480px]:px-3 text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
          >
            Create inventory
          </Link>
        </li>

        <li>
          <Link
            href="/allinventory"
            className="inline-flex font-bold items-center justify-center px-1 py-1 w-[123px] text-sm min-[480px]:text-base min-[480px]:w-[200px] min-[480px]:px-3 text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
          >
            All inventory
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
