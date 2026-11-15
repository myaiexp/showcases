// config axis: grid, domain, ticks, label and title defaults that every axis inherits
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { rng } from "../../shared/cards.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "built-in" | "grid and labels" | "bare";
const configs: Record<Mode, Config> = {
  "built-in": {},
  "grid and labels": {
    axis: {
      grid: true,
      gridColor: "#4a5878",
      gridDash: [3, 3],
      gridOpacity: 0.8,
      domainColor: "#e0b252",
      domainWidth: 2,
      tickColor: "#e0b252",
      tickSize: 8,
      labelColor: "#e0b252",
      labelFontSize: 12,
      labelPadding: 6,
      titleColor: "#fff",
      titleFontSize: 14,
      titlePadding: 10,
    },
  },
  // Axes with no domain line, ticks or labels: just the grid.
  bare: {
    axis: {
      domain: false,
      ticks: false,
      labels: false,
      grid: true,
      gridColor: "#5a6a90",
    },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(7);
  const pts = Array.from({ length: 24 }, () => ({
    x: Math.round(rand() * 100),
    y: Math.round(rand() * 100),
  }));

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 170,
    padding: 8,
    config: configs[mode],
    data: [{ name: "pts", values: pts }],
    scales: [
      {
        name: "x",
        type: "linear",
        domain: [0, 100],
        range: "width",
        zero: false,
      },
      { name: "y", type: "linear", domain: [0, 100], range: "height" },
    ],
    // The axes themselves carry nothing but their scale and a title.
    axes: [
      { orient: "bottom", scale: "x", title: "x value" },
      { orient: "left", scale: "y", title: "y value" },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "pts" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
            fill: { value: "steelblue" },
            size: { value: 50 },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config.axis",
    ms: 2300,
  });
  return () => stage.dispose();
};

export default mount;
