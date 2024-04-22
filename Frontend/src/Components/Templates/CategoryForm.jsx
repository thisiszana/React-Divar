import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCategory } from "Services/admin";
import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });
  //   console.log({ isPending, isError, data });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;

    mutate(form);
  };

  return (
    <form
      onSubmit={submitHandler}
      onChange={changeHandler}
      className={styles.foem}
    >
      <h3>دسته بندی جدید</h3>
      {!!isError && <p>مشکلی پیش آمده است، با تشکر از صبوری شما ادمین عزیز.</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت ثبت شد!</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
