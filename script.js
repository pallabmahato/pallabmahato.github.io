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
  points = Array.from({ length: 54 }, (_, index) => ({
    x: (index / 53) * width,
    base: height * (0.28 + Math.random() * 0.42),
    speed: 0.006 + Math.random() * 0.012,
    phase: Math.random() * Math.PI * 2,
    radius: 2.6 + Math.random() * 3.8,
  }));
}

function draw(timestamp) {
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(8, 119, 103, 0.12)");
  gradient.addColorStop(0.5, "rgba(190, 93, 69, 0.09)");
  gradient.addColorStop(1, "rgba(40, 108, 148, 0.12)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.lineWidth = 1.6;
  context.strokeStyle = "rgba(21, 26, 24, 0.18)";
  context.beginPath();

  points.forEach((point, index) => {
    const y =
      point.base +
      Math.sin(timestamp * point.speed + point.phase) * 30 +
      Math.cos(timestamp * point.speed * 0.65 + point.phase) * 15;

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
      Math.sin(timestamp * point.speed + point.phase) * 30 +
      Math.cos(timestamp * point.speed * 0.65 + point.phase) * 15;

    context.fillStyle =
      index % 4 === 0
        ? "rgba(190, 93, 69, 0.68)"
        : index % 4 === 1
          ? "rgba(8, 119, 103, 0.7)"
          : index % 4 === 2
            ? "rgba(40, 108, 148, 0.62)"
            : "rgba(183, 132, 37, 0.58)";
    context.beginPath();
    context.arc(point.x, y, point.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

resizeCanvas();
requestAnimationFrame(draw);
window.addEventListener("resize", resizeCanvas);

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));
