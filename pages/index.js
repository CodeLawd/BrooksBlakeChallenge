import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar, ArticleContainer, ArticleHeader } from "../components/index";
import Image from "next/image";
import Loader from "../public/Spinner-1s-200px.svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const POST_URL = "https://brooksandblake.com/blogapis/wp-json/wp/v2/posts/";

  const fetchArticles = async () => {
    try {
      const res = await fetch(POST_URL);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="text-center">
      <Navbar />
      <ArticleHeader title="Category Name" span="More News" className="p-10" />
      {!loading ? (
        <div className="grid gap-5 desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 px-10">
          {data?.slice(0, 8).map((data, index) => (
            <ArticleContainer {...data} key={index} />
          ))}
        </div>
      ) : (
        <Image src={Loader} alt="loaders" />
      )}
      <ArticleHeader title="Category Name" span="More News" className="p-10" />
    </div>
  );
};

export default Home;
