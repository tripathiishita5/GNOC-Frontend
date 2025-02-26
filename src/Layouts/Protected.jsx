import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/userStore";
const Protected = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Protected;
