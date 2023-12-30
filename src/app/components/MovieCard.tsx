import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  poster_link: string;
  id: number;
};

const MovieCard = ({ poster_link, id }: Props) => {
  return (
    <div className="border rounded-lg border-secondary drop-shadow-lg">
      <div className="relative">
        <Link href={`/movie/${id}`} className="relative block">
          <Image
            src={poster_link}
            className="object-contain rounded-t-lg"
            width="500"
            height="500"
            alt="Image"
          ></Image>
          {/* <span className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-2 left-2 right-2">
          {name}
        </span> */}
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
