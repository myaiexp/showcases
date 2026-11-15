// autosize: pad, fit, fit-x, fit-y and none lay the same chart out five ways
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Kind = "pad" | "fit" | "fit-x" | "fit-y" | "none";
const kinds: Kind[] = ["pad", "fit", "fit-x", "fit-y", "none"];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (autosize: Kind): Spec => ({
    // The same width, height and padding every time; only autosize changes. `pad` grows the view
    // to hold the axes and legend, `fit` shrinks the data rectangle to keep the total, `none`
    // clips whatever lies outside.
    width: 300,
    height: 150,
    padding: 10,
    autosize,
    background: "#1a2030",
    data: [
      {
        name: "table",
        values: [
          { c: "A", v: 28, g: "x" },
          { c: "B", v: 55, g: "y" },
          { c: "C", v: 43, g: "x" },
          { c: "D", v: 91, g: "y" },
          { c: "E", v: 61, g: "x" },
        ],
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "c" },
        range: "width",
        padding: 0.1,
      },
      {
        name: "y",
        domain: { data: "table", field: "v" },
        nice: true,
        range: "height",
      },
      {
        name: "color",
        type: "ordinal",
        domain: { data: "table", field: "g" },
        range: ["steelblue", "orange"],
      },
    ],
    axes: [
      { orient: "bottom", scale: "x", title: "category" },
      { orient: "left", scale: "y", title: "amount" },
    ],
    legends: [{ fill: "color", title: "group" }],
    // The data rectangle's own fill shows how much room is left for the data.
    encode: { enter: { fill: { value: "#2c3a5a" } } },
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
            fill: { scale: "color", field: "g" },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 6 },
            y: { value: 14 },
            fill: { value: "#ddd" },
            fontSize: { value: 12 },
            text: { value: `autosize: ${autosize}` },
          },
        },
      },
    ],
  });

  await modes(stage, kinds, make, { label: "autosize", ms: 2200 });
  return () => stage.dispose();
};

export default mount;
