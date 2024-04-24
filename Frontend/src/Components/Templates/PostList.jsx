import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getPosts } from "Services/user";
import { deletePost } from "Services/admin";
import Loader from "../Module/Loader";
import LoaderBtn from "../Module/LoaderBtn";
import { sp } from "Utils/number";

import styles from "./PostList.module.css";

function PostList() {
  const [isLoadingDellete, setIsLoadingDelete] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });

  const { mutate, data: deleteData } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries("my-post-list");
      setIsLoadingDelete(false);
    },
    onMutate: () => setIsLoadingDelete(true),
  });

  // console.log({ isLoading, isFetching });

  const deleteHandler = (id) => {
    mutate(id);
  };

  if (!data || !data.data.posts) {
    return <div>No posts available.</div>;
  }

  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>

              <button
                onClick={() => {
                  setIsLoadingDelete(true);
                  deleteHandler(post._id);
                }}
              >
                {isLoadingDellete ? <LoaderBtn /> : "حذف"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
