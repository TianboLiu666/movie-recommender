"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};
type searchType = "keywords" | "semantic";

const Search = (props: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchtype, setSearchtype] = useState<searchType>("keywords");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = encodeURIComponent(query);
    router.push(`/search/${searchtype}/${url}`);
  };
  return (
    <div className="flex flex-col h-full p-1 w-full items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col w-7/12">
        <div className="flex flex-row justify-center">
          <input
            type="text"
            id="inputId"
            placeholder="Enter your keywords"
            className="bg-white border-white rounded-md w-full py-3 pl-2 mr-3"
            onChange={handleChange}
          />
          {/* <button className="px-3" type="submit">
            Search
          </button> */}
        </div>
        <div className="flex w-full justify-center mt-1 items-center">
          <button
            type="submit"
            className="bg-slate-400 h-10 w-1/3 rounded-md mx-auto"
          >
            Keywords Seach
          </button>
          <button
            type="submit"
            className="bg-slate-400 h-10 w-1/3 rounded-md mx-auto"
            onClick={() => setSearchtype("semantic")}
          >
            Semantic Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
