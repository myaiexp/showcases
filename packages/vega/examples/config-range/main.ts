// config range: named palettes (category, ordinal, ramp, symbol...) that scales reach by name
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "built-in" | "tableau-like" | "greens and purples";
const configs: Record<Mode, Config> = {
  "built-in": {},
  "tableau-like": {
    range: {
      category: [
        "#5079a5",
        "#ef8e3b",
        "#dd565c",
        "#79b7b2",
        "#5da052",
        "#ecc853",
        "#ad7aa1",
        "#ef9ba7",
        "#9b7461",
        "#bab0ac",
      ],
      ordinal: { scheme: "greens" },
      ramp: { scheme: "purples" },
      symbol: [
        "circle",
        "square",
        "triangle-up",
        "diamond",
        "cross",
        "triangle-down",
      ],
    },
  },
  "greens and purples": {
    range: {
      category: { scheme: "set2" },
      ordinal: { scheme: "oranges" },
      ramp: { scheme: "blues" },
      diverging: { scheme: "redblue" },
      heatmap: { scheme: "viridis" },
      symbol: ["square", "cross"],
    },
  },
};

const rows = ["category", "ordinal", "ramp", "diverging", "heatmap", "symbol"];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 360,
    height: 170,
    padding: 8,
    config: configs[mode],
    data: [
      {
        name: "cells",
        transform: [{ type: "sequence", start: 0, stop: 10, as: "i" }],
      },
      { name: "rows", values: rows.map((name) => ({ name })) },
    ],
    // Each scale asks for a named range; nothing here lists a colour.
    scales: [
      {
        name: "x",
        type: "band",
        domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        range: "width",
        padding: 0.1,
      },
      {
        name: "row",
        type: "band",
        domain: rows,
        range: "height",
        padding: 0.15,
      },
      {
        name: "category",
        type: "ordinal",
        domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        range: "category",
      },
      {
        name: "ordinal",
        type: "ordinal",
        domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        range: "ordinal",
      },
      { name: "ramp", type: "linear", domain: [0, 9], range: "ramp" },
      {
        name: "diverging",
        type: "linear",
        domain: [0, 4.5, 9],
        range: "diverging",
      },
      { name: "heatmap", type: "linear", domain: [0, 9], range: "heatmap" },
      {
        name: "symbol",
        type: "ordinal",
        domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        range: "symbol",
      },
    ],
    axes: [{ orient: "left", scale: "row", domain: false, ticks: false }],
    marks: [
      ...rows
        .filter((r) => r !== "symbol")
        .map((r) => ({
          type: "rect" as const,
          from: { data: "cells" },
          encode: {
            enter: {
              x: { scale: "x", field: "i" },
              width: { scale: "x", band: 1 },
              y: { scale: "row", value: r },
              height: { scale: "row", band: 1 },
              fill: { scale: r, field: "i" },
            },
          },
        })),
      {
        type: "symbol",
        from: { data: "cells" },
        encode: {
          enter: {
            x: { scale: "x", field: "i", band: 0.5 },
            y: { scale: "row", value: "symbol", band: 0.5 },
            shape: { scale: "symbol", field: "i" },
            size: { value: 90 },
            fill: { value: "#ddd" },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config.range",
    ms: 2400,
  });
  return () => stage.dispose();
};

export default mount;
