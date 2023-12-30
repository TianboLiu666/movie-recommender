import Link from "next/link";
import React from "react";
import Search from "./Search";

type Props = {};

const Nav = (props: Props) => {
  return (
    <>
      <div className="flex h-1/2 bg-blue-800 sticky top-0 w-full">
        <div className="container mx-auto px-1 h-full mt-3 w-full">
          {/* <div className="flex justify-between items-center h-full"> */}
          {/* <Logo /> */}
          {/* <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p>Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
            </ul> */}
          {/* <form action="" className="flex flex-row w-full">

            <input
              type="text"
              id="inputId"
              placeholder="Enter your keywords"
              className="bg-white border-white rounded-md w-full py-3 pl-2 mr-3"
            />
            <button className="px-3" type="submit">Search</button>
            </form> */}
          <Search />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Nav;
