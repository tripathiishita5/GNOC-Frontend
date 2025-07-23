// import { Tree, TreeNode } from "react-organizational-chart";

// const nodeStyle = {
//   border: "1px solid #ececec",
//   borderRadius: 8,
//   padding: "12px 18px",
//   display: "inline-block",
//   background: "#fff",
//   boxShadow: "0 2px 8px #0001",
//   fontWeight: 500,
// };

// const FlowCharts = () => (
//   <div style={{ overflow: "auto", padding: 40 }}>
//     <Tree
//       label={
//         <div style={{ ...nodeStyle, background: "#fde047" }}>
//           Service Operation Head
//         </div>
//       }
//       lineWidth={"2px"}
//       lineColor={"#777"}
//       lineBorderRadius={"10px"}
//       nodePadding={"20px"}
//     >
//       <TreeNode
//         label={
//           <div style={{ ...nodeStyle, background: "#e5e7eb" }}>NOC Manager</div>
//         }
//       >
//         {/* Left NOC Engineer + Analysts */}
//         <TreeNode
//           label={
//             <div style={{ ...nodeStyle, background: "#bbf7d0" }}>
//               NOC Engineer
//             </div>
//           }
//         >
//           <TreeNode
//             label={
//               <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//                 NOC Analyst
//               </div>
//             }
//           />
//           <TreeNode
//             label={
//               <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//                 NOC Analyst
//               </div>
//             }
//           />
//           <TreeNode
//             label={
//               <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//                 NOC Analyst
//               </div>
//             }
//           />
//         </TreeNode>

//         {/* Center analysts (under manager) */}
//         <TreeNode
//           label={
//             <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//               NOC Analyst
//             </div>
//           }
//         />
//         <TreeNode
//           label={
//             <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//               NOC Analyst
//             </div>
//           }
//         />

//         {/* Right NOC Engineer + Analysts */}
//         <TreeNode
//           label={
//             <div style={{ ...nodeStyle, background: "#bbf7d0" }}>
//               NOC Engineer
//             </div>
//           }
//         >
//           <TreeNode
//             label={
//               <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//                 NOC Analyst
//               </div>
//             }
//           />
//           <TreeNode
//             label={
//               <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//                 NOC Analyst
//               </div>
//             }
//           />
//           <TreeNode
//             label={
//               <div style={{ ...nodeStyle, background: "#bae6fd" }}>
//                 NOC Analyst
//               </div>
//             }
//           />
//         </TreeNode>
//       </TreeNode>
//     </Tree>
//   </div>
// );

// export default FlowCharts;
import flowchart from "../Images/Flowchart.png";
import alertHandling from "../Images/AlertHandlingProcess.png";

const Organogram = () => (
  <div className="flex flex-col items-center p-6 space-y-6">
    <img
      src={flowchart}
      alt="Flowchart"
      className="w-[500px] h-auto rounded-lg shadow-lg"
    />

    <div className="max-w-6xl w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Roles and Responsibilities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manager Column */}
        <div className="bg-[#fce7f2] rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-3 text-[#840F59]">NOC Manager</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>People Management</li>
            <li>Update to Secure Management Team</li>
            <li>Collect monitoring requirements</li>
            <li>Help NOC Engineers in monitoring deployement</li>
            <li>Subject Matter expert of Secure Services, functioning and network integration ( Provide Inputs in Change and Incident)</li>
            <li>Subject Matter expert of monitoring solution</li>
            <li>Subject Matter expert of BCDR activity</li>
            <li>Prepared Monitoring Architect Plan </li>
            <li>Understand Monitoring Requirement</li>
            <li>Prepare Plan for new monitoring set up</li>
          </ul>
        </div>

        {/* Engineer Column */}
        <div className="bg-[#fce7f2] rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-3 text-[#840F59]">NOC Engineer</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Develop, Deploy and Maintain Solution</li>
            <li>Provide Requirement to Application Team</li>
            <li>Create Knowledge base</li>
            <li>Provide Training over Technical functionality of Application</li>
            <li>Major Incident Participation</li>
            <li>Inputs for Improving Application Performance</li>
            <li>Root Cause analysis</li>
            <li>Create Monitoring Processes</li>
            <li>Set Up Business Monitoring </li>
          </ul>
        </div>

        {/* Analyst Column */}
        <div className="bg-[#fce7f2] rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-3 text-[#840F59]">NOC Analyst</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>24*7 Monitoring </li>
            <li>Alert Handling</li>
            <li>Ticket Logging-Zabbix Alert</li>
            <li>Set up Bridge Call-For incident Management</li>
            <li>Change and Incident Co-ordinator</li>
            <li>Inputs to Service Delivery Team</li>
            <li>Prepare Capacity & Availability Reports</li>
            <li>Support BCDR</li>
            <li>Inputs to Service Delivery Team</li>
            <li>Provide Evidence for Audit(s)</li>
            <li>Support Cross functional Team in incident analysis</li>
            <li>Support SOC Monitoring</li>
            <li>Ticket Creation (TBD)-Smart Support, Australia, Liberty Helpdesk</li>
            <li>P1&P2 Customer notification(TBD)</li>
            <li>Bravo Data monitoring-Australia</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Organogram;
