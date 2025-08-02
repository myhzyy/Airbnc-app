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
        const cl = shape.classList;
        cl.remove(
          "circle",
          "semi-circle",
          "square",
          "triangle",
          "triangle-2",
          "rectangle",
          "bounce-up",
          "bounce-down"
        );

        cl.add(types[Math.floor(Math.random() * types.length)]);
        const offset = Math.random() * 4 - 2;
        const opp = offset >= 0 ? "+" : "-";
        const styles = [
          ["left", `calc(50% ${opp} ${Math.abs(offset)}vw)`],
          ["--bounce-variance", `${Math.random() * 20 - 10}vh`],
          ["--base_scale", `${Math.random() * 6 + 4}vh`],
          ["--rotation", `${Math.random() * 180 - 90}deg`],
          ["--color", colors[Math.floor(Math.random() * colors.length)]],
        ];
        styles.forEach(([prop, value]) => shape.style.setProperty(prop, value));

        cl.add("bounce-up");
        setTimeout(() => {
          cl.replace("bounce-up", "bounce-down");
        }, 400);
      }, 740);
    });
  }, []);

  return (
    <div className="shape-loader-wrapper">
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <p className="loading-text">Please wait, loading properties...</p>
    </div>
  );
}
