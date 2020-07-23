function drawCircle(context, x = 0, y = 0, radius = 10, color = "black") {
  //draw the full circle
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

//this function will draw a rectangle
function drawRectangle(context, x, y, width, height, color, fill = true) {
  if (fill) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height, color);
  } else {
    context.rect(x, y, width, height);
  }
}

//draws the stroke
function drawStroke(context, x, y, width, height, color) {
  context.strokeStyle = color;
  context.strokeRect(x, y, width, height);
}

//this function will draw the axis
function drawAxis(context, x1, y1, x2, y2, lineWidth, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function drawTicks(context, x1, y1, requiredTicks, xoffset, yoffset, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 1;
  while (requiredTicks > 0) {
    context.moveTo(x1, y1);
    if (yoffset === 0) {
      context.lineTo(x1, y1 + 10);
    } else {
      context.lineTo(x1 + 10, y1);
    }
    context.stroke();
    x1 += xoffset;
    y1 -= yoffset;
    requiredTicks -= 1;
  }
}

//function will draw the BarChart for the values given
function drawBarChart(context, values) {
  let startX = xBegin;
  const startY = yBegin;

  for (let barNumber = 0; barNumber < values.length; barNumber++) {
    const val = values[barNumber];
    drawRectangle(
      context,
      startX,
      startY,
      barWidth,
      -val,
      barColors[barNumber]
    );
    drawStroke(
      context,
      startX,
      startY,
      barWidth,
      -val,
      strokeColors[barNumber]
    );
    startX += barWidth + barMargin;
  }
}

//this function will create legend in horizontal direction
function drawLegend(context, values, startX, startY, width, height, offset) {
  for (let legendNumber = 0; legendNumber < values.length; legendNumber++) {
    context.fillStyle = barColors[legendNumber];
    context.fillRect(startX, startY, width, height);
    startX += offset;
  }
}

//this function will draw the grid lines on the canvas

function drawGrid(color, offset) {
  let currentX = xBegin + offset;
  let currentY = yBegin - offset;
  while (currentX < canvas.width) {
    drawAxis(ctx, currentX, yBegin, currentX, 0, 0.3, color);
    drawAxis(ctx, xBegin, currentY, canvas.width, currentY, 0.3, color);
    currentX += 20;
    currentY -= 20;
  }
}

let canvas = document.getElementById("myCanvas");

//get the context of the canvas
let ctx = canvas.getContext("2d");
//constant values for the bar width;
const barWidth = 30;
const barMargin = 50;
const yMargin = 50;
const xBegin = 10;
const yBegin = canvas.height - 20;
const yAxisHeight = 20;

const barColors = [
  "rgba(54, 217, 138,0.4)",
  "rgba(28, 184, 201, 0.4)",
  "rgba(201, 166, 28, 0.4)",
  "rgba(201, 28, 140,0.4)",
  "rgba(201, 28, 68, 0.4)",
  "rgba(124, 75, 209, 0.4)",
  "rgba(209, 126, 75, 0.4)",
];
const strokeColors = [
  "rgba(54, 217, 138,1)",
  "rgba(28, 184, 201, 1)",
  "rgba(201, 166, 28, 1)",
  "rgba(201, 28, 140,1)",
  "rgba(201, 28, 68, 1)",
  "rgba(124, 75, 209, 1)",
  "rgba(209, 126, 75, 1)",
];
const profitValues = [50, 30, 50, 20, 100, 200, 40];

//y-axis
drawAxis(ctx, xBegin, yBegin, xBegin, yAxisHeight, 1, "gray");

//x-axis
drawAxis(ctx, xBegin, yBegin, xBegin + 900, yBegin, 1, "gray");

//x-ticks
drawTicks(ctx, xBegin, yBegin - 2, 7, barWidth + barMargin, 0, "gray");

//y ticks
drawTicks(ctx, xBegin - 2, yBegin, 7, 0, yMargin, "blue");

drawBarChart(ctx, profitValues);
drawGrid("rgba(149, 167, 171,0.8)", 40);
