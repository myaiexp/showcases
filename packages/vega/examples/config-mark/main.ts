// config mark, symbol and rect: default fills, sizes and opacity for marks that name no colour
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "built-in" | "symbol + rect" | "mark opacity";
const configs: Record<Mode, Config> = {
  "built-in": {},
  // Per-type blocks: the symbol and rect marks below set no fill or stroke, so these apply.
  "symbol + rect": {
    symbol: {
      fill: "#e0b252",
      stroke: "#fff",
      strokeWidth: 1.5,
      size: 220,
      shape: "diamond",
    },
    rect: { fill: "#6f8fd0", cornerRadius: 5 },
  },
  // The top-level "mark" block reaches every mark type; per-type blocks still win over it.
  "mark opacity": {
    mark: { opacity: 0.45 },
    symbol: { fill: "#6ec6a5", size: 400 },
    rect: { fill: "#c97ab0" },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 170,
    padding: 8,
    config: configs[mode],
    data: [
      {
        name: "table",
        values: [
          { c: "A", v: 4 },
          { c: "B", v: 9 },
          { c: "C", v: 6 },
          { c: "D", v: 8 },
          { c: "E", v: 3 },
          { c: "F", v: 7 },
        ],
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "c" },
        range: "width",
        padding: 0.2,
      },
      { name: "y", domain: [0, 10], range: "height" },
    ],
    axes: [{ orient: "bottom", scale: "x" }],
    // No fill, stroke or size anywhere in the marks: every look comes from the config.
    marks: [
      {
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "c" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "v" },
            y2: { scale: "y", value: 0 },
          },
        },
      },
      {
        type: "symbol",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "c", band: 0.5 },
            y: { scale: "y", field: "v" },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 4 },
            y: { value: 12 },
            text: { value: `config: ${mode}` },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config",
    ms: 2300,
  });
  return () => stage.dispose();
};

export default mount;
