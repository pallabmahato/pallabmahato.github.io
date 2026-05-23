const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

const canvas = document.querySelector("#data-canvas");
const context = canvas.getContext("2d");

let width = 0;
let height = 0;
let points = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: 42 }, (_, index) => ({
    x: (index / 41) * width,
    base: height * (0.32 + Math.random() * 0.34),
    speed: 0.008 + Math.random() * 0.014,
    phase: Math.random() * Math.PI * 2,
    radius: 3 + Math.random() * 4,
  }));
}

function draw(timestamp) {
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(15, 123, 99, 0.16)");
  gradient.addColorStop(0.52, "rgba(212, 86, 69, 0.12)");
  gradient.addColorStop(1, "rgba(46, 111, 158, 0.14)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.lineWidth = 2;
  context.strokeStyle = "rgba(23, 33, 29, 0.2)";
  context.beginPath();

  points.forEach((point, index) => {
    const y =
      point.base +
      Math.sin(timestamp * point.speed + point.phase) * 36 +
      Math.cos(timestamp * point.speed * 0.7 + point.phase) * 18;

    if (index === 0) {
      context.moveTo(point.x, y);
    } else {
      context.lineTo(point.x, y);
    }
  });

  context.stroke();

  points.forEach((point, index) => {
    const y =
      point.base +
      Math.sin(timestamp * point.speed + point.phase) * 36 +
      Math.cos(timestamp * point.speed * 0.7 + point.phase) * 18;

    context.fillStyle =
      index % 3 === 0
        ? "rgba(212, 86, 69, 0.76)"
        : index % 3 === 1
          ? "rgba(15, 123, 99, 0.78)"
          : "rgba(46, 111, 158, 0.72)";
    context.beginPath();
    context.arc(point.x, y, point.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

resizeCanvas();
requestAnimationFrame(draw);
window.addEventListener("resize", resizeCanvas);
