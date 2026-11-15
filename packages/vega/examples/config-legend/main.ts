// config legend: border, padding, symbol and label defaults for symbol and gradient legends
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { rng } from "../../shared/cards.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "built-in" | "boxed legends" | "row of symbols";
const configs: Record<Mode, Config> = {
  "built-in": {},
  // A border, padding and bigger symbols; gradient size set by the gradient* properties.
  "boxed legends": {
    legend: {
      padding: 8,
      strokeColor: "#8aa0d0",
      strokeWidth: 1,
      cornerRadius: 6,
      fillColor: "#222c44",
      symbolType: "square",
      symbolSize: 120,
      labelFontSize: 12,
      titleFontSize: 13,
      rowPadding: 6,
      gradientLength: 110,
      gradientThickness: 14,
      gradientStrokeColor: "#ddd",
      gradientStrokeWidth: 1,
    },
  },
  // Entries laid out in a row at the top, a symbol direction and orient default.
  "row of symbols": {
    legend: {
      orient: "top",
      symbolDirection: "horizontal",
      columns: 0,
      columnPadding: 14,
      symbolType: "diamond",
      symbolSize: 110,
      gradientDirection: "horizontal",
      gradientLength: 140,
      labelOffset: 6,
    },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(21);
  const groups = ["north", "south", "east"];
  const pts = Array.from({ length: 30 }, () => ({
    x: rand() * 10,
    y: rand() * 10,
    g: groups[Math.floor(rand() * 3)] ?? "north",
    t: Math.round(rand() * 100),
  }));

  const make = (mode: Mode): Spec => ({
    width: 320,
    height: 150,
    padding: 8,
    config: configs[mode],
    data: [{ name: "pts", values: pts }],
    scales: [
      { name: "x", type: "linear", domain: [0, 10], range: "width" },
      { name: "y", type: "linear", domain: [0, 10], range: "height" },
      {
        name: "group",
        type: "ordinal",
        domain: groups,
        range: ["#6f8fd0", "#e0b252", "#6ec6a5"],
      },
      {
        name: "heat",
        type: "linear",
        domain: [0, 100],
        range: { scheme: "viridis" },
      },
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y" },
    ],
    // Two legends, and neither sets any look of its own: a symbol legend and a gradient legend.
    legends: [
      { fill: "group", title: "region" },
      { fill: "heat", title: "temperature" },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "pts" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
            size: { value: 70 },
            fill: { scale: "group", field: "g" },
            stroke: { scale: "heat", field: "t" },
            strokeWidth: { value: 2 },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config.legend",
    ms: 2400,
  });
  return () => stage.dispose();
};

export default mount;
