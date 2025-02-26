import { Outlet } from "react-router";

const NonProtected = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonProtected;
