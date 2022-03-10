import React from "react";
import Image from "next/image";
import Link from "next/link";

const ArticleContent = (data) => {
  const regex = /(<([^>]+)>)/gi;

  return (
    <Link href={`/${data.id}`} passHref>
      <div className="pt-4 text-left">
        <Image
          src="https://via.placeholder.com/400"
          alt=""
          width={500}
          height={350}
        />
        <h1 className="text-lg font-bold py-4">{data.title.rendered}</h1>
        <p className="text-sm">
          {data.excerpt.rendered.replace(regex, "").slice(0, 150)}
        </p>
      </div>
    </Link>
  );
};

export default ArticleContent;
