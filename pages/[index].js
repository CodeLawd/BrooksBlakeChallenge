import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Navbar } from "../components";
import Loader from "../public/Spinner-1s-200px.svg";

const SingleBlog = () => {
  const router = useRouter();
  const id = router.query.index;
  const regex = /(<([^>]+)>)/gi;
  let cancel = false;

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [comments, setComments] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const { name, email, comment } = comments;

  const POST_URL = `https://brooksandblake.com/blogapis/wp-json/wp/v2/posts/${id}`;

  const fetchArticle = async () => {
    try {
      const res = await fetch(POST_URL);
      const data = await res.json();

      if (cancel) return;
      setData(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // POST ROUTE

  useEffect(() => {
    fetchArticle();
    return () => (cancel = true);
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setComments({ ...comments, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch(POST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comments),
    }).then(() => {
      console.log("Comment Submitted");
      setIsPending(false);
    });
  };

  return (
    <div className="">
      <Navbar />
      {data && (
        <div className="p-10">
          <h1 className="text-3xl">{data.title.rendered}</h1>{" "}
          <div
            className="leading-loose w-5/6"
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
          />
        </div>
      )}

      <div className="p-10">
        <h1 className="text-3xl">Readers Comment</h1>
        <div>
          <div className="flex">
            <div>
              <input
                value={name}
                placeholder="Your Name"
                onChange={handleChangeInput}
                className="rounded px-4 py-2 border"
                name="name"
              />
            </div>
            <div>
              <input
                value={email}
                placeholder="Your Email"
                onChange={handleChangeInput}
                className="rounded px-4 py-2 border ml-4"
                name="email"
              />
            </div>
          </div>
          <div>
            <textarea
              value={comment}
              placeholder="Add a Comment"
              onChange={handleChangeInput}
              className="rounded px-4 py-2 border mt-4 w-200"
              name="comment"
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className={`${
                isPending && "bg-blue-200"
              } bg-blue-500 px-4 py-2 rounded text-white`}
            >
              {isPending ? "Submitting" : "Add Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
