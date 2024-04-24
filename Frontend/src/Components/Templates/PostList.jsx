import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "Services/user";

import Loader from "../Module/Loader";
import { sp } from "Utils/number";

import { deletePost } from "Services/admin";
import styles from "./PostList.module.css";

function PostList() {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });

  const { mutate, isLoading: deleteLoading } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries("my-post-list"),
  });

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
              {/* {console.log(post._id)} */}
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
              <button onClick={() => deleteHandler(post._id)}>حذف</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
