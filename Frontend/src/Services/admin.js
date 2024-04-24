import api from "Configs/api";

const addCategory = (data) => api.post("category", data);
const getCategory = () => api.get("category");
const deleteCategory = (id) => api.delete(`category/${id}`);
const deletePost = (id) => api.delete(`post/delete/${id}`);

export { addCategory, getCategory, deleteCategory, deletePost };
