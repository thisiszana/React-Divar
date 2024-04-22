import { Routes, Route } from "react-router-dom";

import HomePage from "src/Pages/HomePage";
import DashboardPage from "src/Pages/DashboardPage";
import PageNotFound from "src/Pages/404";
import AdminPage from "src/Pages/AdminPage";

function Router() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/auth" element={<AdminPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
