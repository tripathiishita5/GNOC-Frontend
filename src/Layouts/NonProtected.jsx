import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/userStore";

const NonProtected = () => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonProtected;
