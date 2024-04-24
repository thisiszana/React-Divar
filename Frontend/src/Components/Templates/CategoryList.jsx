import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCategory, deleteCategory } from "Services/admin";
import Loader from "../Module/Loader";

import styles from "./CategoryList.module.css";

function CategoryList() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const {
    mutate,
    data: dataDelete,
    isLoading: isLoadingDelete,
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  //   console.log(data);

  const deleteHandler = (id) => {
    mutate(id);
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id} className={styles.listBox}>
            <div className={styles.titleBox}>
              <img src={`${i.icon}.svg`} alt="" />
              <h5>{i.name}</h5>
            </div>
            <div className={styles.deleteBox}>
              <p>Slug : {i.slug}</p>
              <button onClick={() => deleteHandler(i._id)}>حذف</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
