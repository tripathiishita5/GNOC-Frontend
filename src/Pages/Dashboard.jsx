/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getUsers, getAnalytics } from "../htttp/api";
import { Card, List, Avatar, Popover, Statistic, Progress } from "antd";
import { User, Folder } from "lucide-react";
import { Pie } from "@ant-design/plots";

function Dashboard() {
  // Fetch Users and Analytics Data
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    placeholderData: (prevData) => prevData,
  });

  const { data: analyticdata } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
    placeholderData: (prevData) => prevData,
  });

  // Role Priority for Sorting
  const rolePriority = { manager: 1, engineer: 2, analyst: 3 };
  const sortedUsers = data?.data
    ? [...data.data].sort((a, b) => rolePriority[a.role] - rolePriority[b.role])
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
    
      <h1 className="text-4xl font-semibold text-black mb-8 text-center">
        Team Dashboard
      </h1>

      <div className="flex gap-6">
        {/* Left Side - Team Members */}
        <Card
          title="Team Members"
          style={{ width: "50%", maxHeight: "100%", overflowY: "auto" }}
        >
          <List
            itemLayout="horizontal"
            dataSource={sortedUsers}
            renderItem={(user) => (
              <List.Item>
                <Popover
                  content={
                    <div className="text-sm">
                      <p>Email: {user.email}</p>
                      <p>Active Tickets: 20</p>
                    </div>
                  }
                  title="User Details"
                  trigger="hover"
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar icon={<User />} />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.role}</p>
                    </div>
                  </div>
                </Popover>
              </List.Item>
            )}
          />
        </Card>

        {/* Right Side - Analytics */}
        <Card title="Project & User Analytics" style={{ width: "50%" }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Statistic
              title="Total Users"
              value={analyticdata?.data?.totalUsers || 0}
              prefix={<User />}
            />
            <Statistic
              title="Total Projects"
              value={analyticdata?.data?.totalProjects || 0}
              prefix={<Folder />}
            />
          </div>

          {/* Project Status */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Project Status</h2>
            <Progress
              percent={
                ((analyticdata?.data?.projectStatus?.ongoing || 0) /
                  analyticdata?.data?.totalProjects) *
                100
              }
              status="active"
              showInfo
              strokeColor="blue"
              format={() =>
                `Ongoing: ${analyticdata?.data?.projectStatus?.ongoing}`
              }
            />
            <Progress
              percent={
                ((analyticdata?.data?.projectStatus?.onHold || 0) /
                  analyticdata?.data?.totalProjects) *
                100
              }
              status="exception"
              showInfo
              strokeColor="orange"
              format={() =>
                `On Hold: ${analyticdata?.data?.projectStatus?.onHold}`
              }
            />
            <Progress
              percent={
                ((analyticdata?.data?.projectStatus?.completed || 0) /
                  analyticdata?.data?.totalProjects) *
                100
              }
              status="success"
              showInfo
              strokeColor="green"
              format={() =>
                `Completed: ${analyticdata?.data?.projectStatus?.completed}`
              }
            />
          </div>

          {/* User Role Distribution (Pie Chart) */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              User Role Distribution
            </h2>
            <Pie
              data={[
                {
                  role: "Managers",
                  value: analyticdata?.data?.userRoles?.managers || 0,
                },
                {
                  role: "Engineers",
                  value: analyticdata?.data?.userRoles?.engineers || 0,
                },
                {
                  role: "Analysts",
                  value: analyticdata?.data?.userRoles?.analysts || 0,
                },
              ]}
              angleField="value"
              colorField="role"
              height={200}
              label={{
                type: "spider",
                labelHeight: 28,
                content: "{name}: {percentage}",
              }}
            />
          </div>

          {/* Recent Projects & Users */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Recent Projects</h2>
              <List
                dataSource={analyticdata?.data?.recentProjects || []}
                renderItem={(project) => (
                  <List.Item>
                    <p>
                      {project.MonitoringProjects} -{" "}
                      <span className="text-gray-500">{project.status}</span>
                    </p>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Recent Users</h2>
              <List
                dataSource={analyticdata?.data?.recentUsers || []}
                renderItem={(user) => (
                  <List.Item>
                    <p>
                      {user.name} -{" "}
                      <span className="text-gray-500">{user.role}</span>
                    </p>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
