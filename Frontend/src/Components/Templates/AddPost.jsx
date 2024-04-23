import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getCategory } from "Services/admin";
import { getCookie } from "Utils/cookies";

import styles from "./AddPost.module.css";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: e.target.value });
    } else {
      setForm({ ...form, [name]: e.target.files[0] });
    }
  };

  const baseURL = import.meta.env.VITE_BASE_URL;

  const addHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    const token = getCookie("accessToken");

    axios.post(`http://localhost:3400/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error("مشکلی پیش آمده است"));
  };

  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((i) => (
          <option value={i._id} key={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler}>ایجاد</button>
    </form>
  );
}

export default AddPost;
