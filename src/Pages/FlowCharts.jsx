import { Tree, TreeNode } from "react-organizational-chart";

const nodeStyle = {
  border: "1px solid #ececec",
  borderRadius: 8,
  padding: "12px 18px",
  display: "inline-block",
  background: "#fff",
  boxShadow: "0 2px 8px #0001",
  fontWeight: 500,
};

const FlowCharts = () => (
  <div style={{ overflow: "auto", padding: 40 }}>
    <Tree
      label={
        <div style={{ ...nodeStyle, background: "#fde047" }}>
          Service Operation Head
        </div>
      }
      lineWidth={"2px"}
      lineColor={"#777"}
      lineBorderRadius={"10px"}
      nodePadding={"20px"}
    >
      <TreeNode
        label={
          <div style={{ ...nodeStyle, background: "#e5e7eb" }}>NOC Manager</div>
        }
      >
        {/* Left NOC Engineer + Analysts */}
        <TreeNode
          label={
            <div style={{ ...nodeStyle, background: "#bbf7d0" }}>
              NOC Engineer
            </div>
          }
        >
          <TreeNode
            label={
              <div style={{ ...nodeStyle, background: "#bae6fd" }}>
                NOC Analyst
              </div>
            }
          />
          <TreeNode
            label={
              <div style={{ ...nodeStyle, background: "#bae6fd" }}>
                NOC Analyst
              </div>
            }
          />
          <TreeNode
            label={
              <div style={{ ...nodeStyle, background: "#bae6fd" }}>
                NOC Analyst
              </div>
            }
          />
        </TreeNode>

        {/* Center analysts (under manager) */}
        <TreeNode
          label={
            <div style={{ ...nodeStyle, background: "#bae6fd" }}>
              NOC Analyst
            </div>
          }
        />
        <TreeNode
          label={
            <div style={{ ...nodeStyle, background: "#bae6fd" }}>
              NOC Analyst
            </div>
          }
        />

        {/* Right NOC Engineer + Analysts */}
        <TreeNode
          label={
            <div style={{ ...nodeStyle, background: "#bbf7d0" }}>
              NOC Engineer
            </div>
          }
        >
          <TreeNode
            label={
              <div style={{ ...nodeStyle, background: "#bae6fd" }}>
                NOC Analyst
              </div>
            }
          />
          <TreeNode
            label={
              <div style={{ ...nodeStyle, background: "#bae6fd" }}>
                NOC Analyst
              </div>
            }
          />
          <TreeNode
            label={
              <div style={{ ...nodeStyle, background: "#bae6fd" }}>
                NOC Analyst
              </div>
            }
          />
        </TreeNode>
      </TreeNode>
    </Tree>
  </div>
);

export default FlowCharts;
