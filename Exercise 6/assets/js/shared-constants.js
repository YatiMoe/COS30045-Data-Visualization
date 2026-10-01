/* =========================================================
   Exercise 6 — shared-constants.js
   Constants shared by the histogram (6.1/6.2) and the
   scatterplot + tooltip (6.3/6.4).
   ========================================================= */

// ---------- Chart dimensions (Dufour & Meeks "inner chart" pattern) ----------
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// ---------- Colours (matched to the ApplianceWatt theme) ----------
const barColor = "#FFC63A";            // histogram bars (amber accent)
const bodyBackgroundColor = "#161D2E"; // same as the panel/svg background -> gap between bars
const axisColor = "#93A0B8";
const labelColor = "#F2F4F8";

// ---------- Histogram (6.1) ----------
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Bin generator lives here so interactions.js can re-bin filtered data (6.2)
const binGenerator = d3.bin()
  .value(d => d.energyConsumption);

// ---------- Filters (6.2) ----------
const filters_screen = [
  { id: "all",  label: "All",  isActive: true  },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// ---------- Scatterplot (6.3) ----------
let innerChartS;                 // inner chart for the scatterplot (set in scatterplot.js)
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Distinct hues for screen technology (categorical, not saturation)
const screenTechColors = {
  LED:  "#3ED6C6", // teal
  LCD:  "#FFC63A", // amber
  OLED: "#B794F6"  // violet
};

// ---------- Tooltip (6.4) ----------
const tooltipWidth = 130;
const tooltipHeight = 48;
