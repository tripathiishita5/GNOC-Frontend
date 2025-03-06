import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (projects) => {
  // Remove unnecessary fields
  // eslint-disable-next-line no-unused-vars
  const filteredProjects = projects.map(({ _id, __v, ...rest }) => {
    const cleanedProject = {};
    Object.keys(rest).forEach((key) => {
      if (!key.includes("Color")) {
        cleanedProject[key] = rest[key];
      }
    });
    return cleanedProject;
  });

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(filteredProjects, { skipHeader: false });

  // Get the range of the worksheet
  const range = XLSX.utils.decode_range(ws["!ref"]);

  // Define mapping of task names to color keys
  const colorMapping = {
    Discussion: "DiscussionColor",
    PreRequisites: "PreRequisitesColor",
    implementationDeployment: "implementationDeploymentColor",
    review: "reviewColor",
    goLive: "goLiveColor",
  };

  // Apply styles manually to the correct cells
  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    Object.keys(colorMapping).forEach((key) => {
      const colIndex = Object.keys(filteredProjects[0]).indexOf(key);
      if (colIndex === -1) return; // If column not found, skip

      const cellRef = XLSX.utils.encode_cell({ r: row, c: colIndex });

      // Get the corresponding color field in original data
      const colorKey = colorMapping[key];
      const colorValue = projects[row - 1][colorKey];

      if (ws[cellRef] && colorValue) {
        const color = colorValue.replace("#", ""); // Remove #

        // Apply background color style
        ws[cellRef].s = {
          fill: { fgColor: { rgb: color } },
          font: { bold: true },
        };
      }
    });
  }

  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Projects");

  // Convert to Excel file and trigger download
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "Projects.xlsx");
};

export default exportToExcel;
