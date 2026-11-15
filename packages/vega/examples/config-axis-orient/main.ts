// config axisX, axisY, axisBottom, axisTop...: orientation blocks refine the general axis block
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode =
  "axis" | "axis + axisX / axisY" | "axisBottom, axisTop, axisLeft, axisRight";
const configs: Record<Mode, Config> = {
  axis: {
    axis: { labelColor: "#ccc", tickColor: "#ccc", domainColor: "#ccc" },
  },
  // Orientation blocks beat the general block: x axes (top and bottom) orange, y axes green.
  "axis + axisX / axisY": {
    axis: { labelColor: "#ccc", tickColor: "#ccc", domainColor: "#ccc" },
    axisX: {
      labelColor: "#e0b252",
      tickColor: "#e0b252",
      domainColor: "#e0b252",
    },
    axisY: {
      labelColor: "#6ec6a5",
      tickColor: "#6ec6a5",
      domainColor: "#6ec6a5",
    },
  },
  // The four sides on their own, which in turn beat axisX and axisY.
  "axisBottom, axisTop, axisLeft, axisRight": {
    axis: { labelColor: "#ccc", tickColor: "#ccc", domainColor: "#ccc" },
    axisX: { labelColor: "#e0b252" },
    axisBottom: {
      labelAngle: -90,
      labelAlign: "right",
      labelBaseline: "middle",
      labelColor: "#f08a5d",
    },
    axisTop: { labelColor: "#c97ab0", tickSize: 10 },
    axisLeft: { labelColor: "#6ec6a5", labelFontSize: 14 },
    axisRight: { labelColor: "#6f8fd0", grid: true, gridColor: "#3c4968" },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 340,
    height: 150,
    padding: 8,
    config: configs[mode],
    scales: [
      { name: "x", type: "linear", domain: [0, 1000], range: "width" },
      { name: "y", type: "linear", domain: [0, 50], range: "height" },
      { name: "y2", type: "linear", domain: [0, 1], range: "height" },
    ],
    // One axis on each side of the data rectangle.
    axes: [
      { orient: "bottom", scale: "x", tickCount: 10 },
      { orient: "top", scale: "x", tickCount: 5 },
      { orient: "left", scale: "y" },
      { orient: "right", scale: "y2" },
    ],
    marks: [
      {
        type: "text",
        encode: {
          enter: {
            x: { signal: "width / 2" },
            y: { signal: "height / 2" },
            align: { value: "center" },
            baseline: { value: "middle" },
            text: { value: mode },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config",
    ms: 2500,
  });
  return () => stage.dispose();
};

export default mount;
