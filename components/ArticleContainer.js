import React from "react";
import { ArticleContent } from ".";

const ArticleContainer = (data) => {
  return (
    <div className="">
      <ArticleContent {...data} />
    </div>
  );
};

export default ArticleContainer;
