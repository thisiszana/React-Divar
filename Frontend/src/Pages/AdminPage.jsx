import CategoryForm from "Components/Templates/CategoryForm";
import CategoryList from "Components/Templates/CategoryList";

function AdminPage() {
  return (
    <div>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}

export default AdminPage;
