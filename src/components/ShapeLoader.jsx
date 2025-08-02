// ShapeLoader.jsx
import { useEffect } from "react";
import "./ShapeLoader.css";

export default function ShapeLoader() {
  useEffect(() => {
    const types = [
      "circle",
      "semi-circle",
      "square",
      "triangle",
      "triangle-2",
      "rectangle",
    ];
    const colors = [
      "#836ee5",
      "#fe94b4",
      "#49d2f5",
      "#ff5354",
      "#00b1b4",
      "#ffe465",
      "#0071ff",
      "#03274b",
    ];
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape) => {
      setInterval(() => {
        shape.className = "shape";
        const type = types[Math.floor(Math.random() * types.length)];
        shape.classList.add(type);

        const offset = Math.random() * 4 - 2;
        const opp = offset >= 0 ? "+ " : "- ";

        shape.style.setProperty(
          "left",
          `calc(50% ${opp}${Math.abs(offset)}vw)`
        );
        shape.style.setProperty(
          "--bounce-variance",
          `${Math.random() * 20 - 10}vh`
        );
        shape.style.setProperty("--base_scale", `${Math.random() * 6 + 4}vh`);
        shape.style.setProperty("--rotation", `${Math.random() * 180 - 90}deg`);
        shape.style.setProperty(
          "--color",
          colors[Math.floor(Math.random() * colors.length)]
        );

        if (!shape.classList.contains("bounce-up"))
          shape.classList.add("bounce-up");
        shape.classList.replace("bounce-down", "bounce-up");

        setTimeout(() => {
          shape.classList.replace("bounce-up", "bounce-down");
        }, 400);
      }, 740);
    });
  }, []);

  return (
    <div className="shape-loader-container">
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
  );
}
