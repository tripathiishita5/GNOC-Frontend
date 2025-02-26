import { Outlet } from "react-router";
import { useAuthStore } from "../store/userStore";
const Protected = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Protected;
