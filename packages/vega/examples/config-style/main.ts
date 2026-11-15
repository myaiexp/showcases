// config style: named bundles of mark properties, picked per mark with the `style` directive
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "no styles" | "styles defined";
const styled: Config = {
  style: {
    // Custom names, used by the marks below ...
    hot: { fill: "#ef6a4c", shape: "triangle-up", size: 260 },
    cool: {
      fill: "#5fb4e8",
      stroke: "#fff",
      strokeWidth: 2,
      shape: "square",
      size: 200,
    },
    // ... and a built-in name: every axis and legend label.
    "guide-label": { fill: "#e0b252", fontSize: 13, fontStyle: "italic" },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 150,
    padding: 8,
    config: mode === "styles defined" ? styled : {},
    data: [
      {
        name: "pts",
        values: [
          { x: 1, y: 3, hot: true },
          { x: 2, y: 7, hot: false },
          { x: 3, y: 5, hot: true },
          { x: 4, y: 8, hot: false },
          { x: 5, y: 2, hot: true },
          { x: 6, y: 6, hot: false },
        ],
      },
    ],
    scales: [
      { name: "x", type: "linear", domain: [0, 7], range: "width" },
      { name: "y", type: "linear", domain: [0, 10], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y" },
    ],
    marks: [
      // `style` names a config entry. Two marks, two styles; in "no styles" the names match nothing.
      {
        type: "symbol",
        style: "hot",
        from: { data: "pts" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
          },
          update: { opacity: { signal: "datum.hot ? 1 : 0" } },
        },
      },
      {
        type: "symbol",
        style: ["cool"],
        from: { data: "pts" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
          },
          update: { opacity: { signal: "datum.hot ? 0 : 1" } },
        },
      },
      {
        type: "text",
        encode: {
          enter: { x: { value: 6 }, y: { value: 12 }, text: { value: mode } },
        },
      },
    ],
  });

  await modes(stage, ["no styles", "styles defined"] as Mode[], make, {
    label: "config.style",
    ms: 2200,
  });
  return () => stage.dispose();
};

export default mount;
