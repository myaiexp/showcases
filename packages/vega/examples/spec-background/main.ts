// background: a colour for the whole view, or a signal expression that recolours it live
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 180,
    padding: 24,
    // Signal-valued: the expression is the update of the underlying `background` signal, so it can
    // read other signals. Here the mix of the two sliders makes an rgb colour.
    background: {
      signal:
        "'rgb(' + hue + ',' + round(hue / 2 + 40) + ',' + (255 - hue) + ')'",
    },
    signals: [
      {
        name: "hue",
        value: 60,
        bind: { input: "range", min: 0, max: 200, step: 1 },
      },
    ],
    data: [
      {
        name: "table",
        values: [
          { i: 1, v: 3 },
          { i: 2, v: 7 },
          { i: 3, v: 5 },
          { i: 4, v: 9 },
          { i: 5, v: 6 },
          { i: 6, v: 8 },
        ],
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "i" },
        range: "width",
        padding: 0.2,
      },
      { name: "y", domain: [0, 10], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x", domainColor: "#ddd", tickColor: "#ddd" },
    ],
    marks: [
      {
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "i" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "v" },
            y2: { scale: "y", value: 0 },
            fill: { value: "#f4f1de" },
          },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { value: 0 },
            y: { value: -10 },
            fill: { value: "#fff" },
            text: { signal: "background" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "hue", [60, 120, 190, 130, 20, 0], 1000);
  return () => stage.dispose();
};

export default mount;
