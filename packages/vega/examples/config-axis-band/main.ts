// config axisBand: settings that apply only to axes over band scales (tick placement and grid)
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "default" | "tickBand: extent" | "bandPosition: 0 + tickExtra";
const configs: Record<Mode, Config> = {
  default: {},
  // Ticks and grid lines at band edges instead of band centres.
  "tickBand: extent": {
    axisBand: {
      tickBand: "extent",
      grid: true,
      gridColor: "#56658a",
      tickSize: 8,
    },
  },
  // The same boundary effect by hand: ticks at each band's left edge plus one extra at the end.
  "bandPosition: 0 + tickExtra": {
    axisBand: {
      bandPosition: 0,
      tickExtra: true,
      grid: true,
      gridColor: "#56658a",
      tickSize: 8,
    },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 160,
    padding: 8,
    config: configs[mode],
    data: [
      {
        name: "table",
        values: [
          { c: "Mon", v: 5 },
          { c: "Tue", v: 8 },
          { c: "Wed", v: 4 },
          { c: "Thu", v: 9 },
          { c: "Fri", v: 6 },
        ],
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "c" },
        range: "width",
        padding: 0.15,
      },
      { name: "y", domain: [0, 10], range: "height" },
    ],
    // axisBand applies to the x axis (a band scale) but not to the linear y axis.
    axes: [
      { orient: "bottom", scale: "x", title: mode },
      { orient: "left", scale: "y", grid: true, gridColor: "#3c4968" },
    ],
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
            fill: { value: "steelblue" },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config.axisBand",
    ms: 2400,
  });
  return () => stage.dispose();
};

export default mount;
