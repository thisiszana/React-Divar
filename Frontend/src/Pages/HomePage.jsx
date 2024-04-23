import { useQuery } from "@tanstack/react-query";

import { getAllPosts } from "Services/user";
import { getCategory } from "Services/admin";

import Main from "Components/Templates/Main";
import Sidebar from "Components/Templates/Sidebar";
import Loader from "Components/Module/Loader";

function HomePage() {
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["posts-list"],
    queryFn: getAllPosts,
  });

  const style = {
    display: "flex",
  };
  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar category={category} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
