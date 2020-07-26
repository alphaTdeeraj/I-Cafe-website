//this function will create animation values for the y attribute
function createYValues(height) {
  const maxHeight = svgMaxHeight;
  const values = [];
  const heightPercentage = Math.floor((100 * height) / maxHeight);
  const percentageOffset = Math.floor(heightPercentage / 5);
  for (let start = 1; start < 5; start++) {
    values.push(100 - percentageOffset * start);
  }
  values.push(100 - heightPercentage);
  return values.join("%;") + "%;";
}

//this function will create a svg text element
function createText(text, x, y, color) {
  return `<text x="${x}" y="${y}%" fill="${color}" class="chartText">${text}</text>`;
}

function getYAxisValues(actualMaxValue) {
  const maxValue = actualMaxValue + 100;
  const currentXPosition = 0;
  let percentage = 0;
  const yAxisText = [];
  for (let numValues = 1; numValues <= 6; numValues++) {
    const text = Math.floor(maxValue * (percentage / 100));
    const yPosition = 100 - percentage;
    yAxisText.push(createText(text, currentXPosition, yPosition, "gray"));
    percentage += 18;
  }
  return yAxisText.join(" ");
}

//this function will draw line
function drawLine(x1, y1, x2, y2, strokeWidth, color) {
  const svgLine = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${color};stroke-width:${strokeWidth}" />
`;
  return svgLine;
}

//this function will create rectangular bar
function createBar(x, height, width, dur, fillColor, strokeColor) {
  try {
    const yValue = 100 - (height / svgMaxHeight) * 100;
    const rectElement = ` <rect  x="${x}" y="${yValue}%" width="${width}" height="${height}" fill="${fillColor}" stroke="${strokeColor}" class="animateRect">
     
    </rect>`;
    return rectElement;
  } catch (e) {
    return null;
  }
}

//this function will create the barChart
function drawBarChart(values) {
  let currentXPosition = 33;
  const bars = [];
  for (let barNumber = 0; barNumber < values.length; barNumber++) {
    const val = values[barNumber];
    const fillColor = barColors[barNumber];
    const strokeColor = strokeColors[barNumber];
    const barElement = createBar(
      currentXPosition,

      val,
      barWidth,
      animationDuration,
      fillColor,
      strokeColor
    );

    if (barElement) {
      bars.push(barElement);
    }
    currentXPosition += barWidth + barOffSet;
  }
  return bars.join(" ");
}

//this function will create a legend

function createLegend(values) {
  let currentXPosition = 100;
  const yPosition = 10;
  let width = 15;
  for (let numLegend = 0; numLegend < values.length; numLegend++) {
    const fillColor = barColors[numLegend];
    const strokeColor = strokeColors[numLegend];
    const barElement = ` <rect  x="${currentXPosition}" y="${yPosition}%" width="${width}" height="${width}" fill="${fillColor}" stroke="${strokeColor}">
     
    </rect>`;

    svgElement.innerHTML += barElement;
    svgElement.innerHTML += `<text x="${
      currentXPosition + width + 10
    }" y="13%" class="chartText" fill="black" style="font-size:20px">${
      values[numLegend]
    } </text>`;
    currentXPosition += width + 100;
  }
}

//this function will make the pressed button active
function toggleActive(e) {
  e.preventDefault();
  svgElement.innerHTML = ``;
  const pressedButton = e.target;
  const productType = pressedButton.getAttribute("data-product-type");
  const graphType = pressedButton.getAttribute("data-graph-type");
  const activeButton = document.querySelector(`#${graphType} button.active`);
  activeButton.classList.remove("active");
  pressedButton.classList.add("active");
  displayChart(productType);
}

function displayChart(dataType) {
  svgElement.innerHTML = "";
  const values = data[dataType];
  const maxValue = Math.max(...values);
  svgElement.innerHTML = drawBarChart(values);

  svgElement.innerHTML += getYAxisValues(maxValue);
  createLegend(days);
  svgElement.innerHTML += drawLine(33, 0, 33, svgMaxHeight, 1.3, axisColor);
  svgElement.innerHTML += drawLine(
    33,
    svgMaxHeight,
    svgMaxWidth,
    svgMaxHeight,
    1.3,
    axisColor
  );
}

//CONST VALUES
const barOffSet = 70;
const barWidth = 60;
const animationDuration = 0.5;
const axisColor = "rgba(76, 80, 82, 0.8)";

//color for bar fills
const barColors = [
  "rgba(3,43,67,0.4)",
  "rgba(19,111,99, 0.4)",
  "rgba(201, 166, 28, 0.4)",
  "rgba(201, 28, 140,0.4)",
  "rgba(96, 219, 252, 0.4)",
  "rgba(124, 75, 209, 0.4)",
  "rgba(209, 126, 75, 0.4)",
];

//color for bar stroke
const strokeColors = [
  "rgba(3,43,67,0.8)",
  "rgba(19,111,99, 0.8)",
  "rgba(201, 166, 28, 0.8)",
  "rgba(201, 28, 140,0.8)",
  "rgba(96, 219, 252, 0.8)",
  "rgba(124, 75, 209, 0.8)",
  "rgba(209, 126, 75, 0.8)",
];

const data = {
  coldCoffee: [130, 100, 200, 100, 53, 150, 210],
  hotCoffee: [200, 150, 100, 350, 300, 200, 60],
  coffeeCups: [100, 120, 130, 160, 200, 200, 120],
  coffeePowder: [300, 300, 150, 200, 220, 222, 100],
};

//this is the data which will be used by the barChart
const profitValues = [130, 100, 200, 100, 53, 150, 210];
const days = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
let svgElement = document.getElementById("barChartSVG");
const svgMaxHeight = svgElement.clientHeight;
const svgMaxWidth = svgElement.clientWidth;
svgElement.setAttribute(
  "viewBox",
  `0 0 ${svgElement.clientWidth} ${svgMaxHeight}`
);

displayChart("coldCoffee");
