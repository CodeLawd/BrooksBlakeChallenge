import React from "react";

const BlogHeader = ({ title, span }) => {
  return (
    <div className="flex justify-between px-10 py-6">
      <h1 className="text-3xl">{title}</h1>
      <span>{span}</span>
    </div>
  );
};

export default BlogHeader;
