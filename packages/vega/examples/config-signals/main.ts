// config signals: a signal defined in the config styles the spec and can be driven from outside
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 380,
    height: 170,
    padding: 8,
    config: {
      // A style variable that lives in the config: the entries below are written relative to it.
      signals: [
        {
          name: "fontSizeScale",
          value: 1,
          bind: { input: "range", min: 0.6, max: 2.2, step: 0.1 },
        },
      ],
      text: { fontSize: { signal: "12 * fontSizeScale" } },
      axis: { labelFontSize: { signal: "10 * fontSizeScale" } },
    },
    data: [
      {
        name: "table",
        values: [
          { c: "A", v: 4 },
          { c: "B", v: 9 },
          { c: "C", v: 6 },
          { c: "D", v: 8 },
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
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y", tickCount: 5 },
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
      // A text mark names no font size, so it follows the config signal.
      {
        type: "text",
        from: { data: "table" },
        encode: {
          update: {
            x: { scale: "x", field: "c", band: 0.5 },
            y: { scale: "y", field: "v", offset: -4 },
            align: { value: "center" },
            text: { field: "v" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "fontSizeScale", [1.8, 1, 0.7, 1.4], 1100);
  return () => stage.dispose();
};

export default mount;
