// data.url: load a JSON file (the default format); the rows reveal as a signal sweeps upward
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 220,
    padding: 8,
    signals: [
      {
        name: "upTo",
        value: 1,
        bind: { input: "range", min: 0, max: 1, step: 0.02 },
      },
    ],
    data: [
      // No format given: the file is read as a JSON array of row objects.
      { name: "points", url: "data/points.json" },
      // A derived set: only the points whose y is below the slider.
      {
        name: "shown",
        source: "points",
        transform: [{ type: "filter", expr: "datum.y <= upTo" }],
      },
    ],
    scales: [
      { name: "x", type: "linear", domain: [0, 1], range: "width" },
      {
        name: "y",
        type: "linear",
        domain: [0, 1],
        range: "height",
        reverse: true,
      },
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y" },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "shown" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
            size: { value: 22 },
            fill: { value: "orange" },
          },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { signal: "width" },
            y: { value: -2 },
            align: { value: "right" },
            fill: { value: "#aaa" },
            text: {
              signal:
                "length(data('shown')) + ' of ' + length(data('points')) + ' rows'",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "upTo", [0.2, 0.4, 0.6, 0.8, 1, 0.1], 900);
  return () => stage.dispose();
};

export default mount;
