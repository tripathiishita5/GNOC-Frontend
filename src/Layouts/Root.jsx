import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { profile } from "../htttp/api";
import { useAuthStore } from "../store/userStore";
import { useEffect } from "react";
const Root = () => {
  const { setUser } = useAuthStore();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
  });

  useEffect(() => {
    if (data) {
      setUser(data.data.data);
    }
  }, [data, setUser]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
