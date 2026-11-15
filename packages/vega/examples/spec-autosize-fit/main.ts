// autosize "fit": the total view stays put, so a growing padding squeezes the data rectangle
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    // Signal-valued padding: the expression becomes the update of the underlying padding signal.
    padding: { signal: "gap" },
    // With fit, width and height are the total size less padding; the signals below hold what is left
    // for the data rectangle after the padding, axes and legend have taken their share.
    autosize: "fit",
    background: "#1a2030",
    signals: [
      {
        name: "gap",
        value: 10,
        bind: { input: "range", min: 0, max: 70, step: 5 },
      },
    ],
    data: [
      {
        name: "table",
        values: [
          { c: "A", v: 28 },
          { c: "B", v: 55 },
          { c: "C", v: 43 },
          { c: "D", v: 91 },
          { c: "E", v: 81 },
          { c: "F", v: 53 },
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
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y" },
    ],
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
            fill: { value: "steelblue" },
          },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { signal: "width / 2" },
            y: { value: 16 },
            align: { value: "center" },
            fill: { value: "#fff" },
            text: {
              signal:
                "'padding ' + gap + '  ->  data rectangle ' + round(width) + ' x ' + round(height)",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "gap", [10, 30, 50, 70, 40, 20, 0], 1100);
  return () => stage.dispose();
};

export default mount;
