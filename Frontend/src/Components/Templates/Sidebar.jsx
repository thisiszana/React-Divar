import styles from "./Sidebar.module.css";

function Sidebar({category}) {
  
  return (
    <div className={styles.sidebar}>
      <h4>دسته بندی ها</h4>
      <ul>
        {category?.data.map((category) => (
          <li key={category._id}>
            <img src={`${category.icon}.svg`} alt="" />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
