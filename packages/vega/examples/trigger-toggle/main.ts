// data trigger toggle: pressing a bar inserts its row into a selection, pressing again removes it
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const cats = "ABCDEFGH";

  const spec: Spec = {
    width: 420,
    height: 170,
    padding: 8,
    signals: [
      // The datum of the pressed bar. force lets a second press on the same bar through.
      {
        name: "picked",
        value: null,
        on: [{ events: "@bar:mousedown", update: "datum", force: true }],
      },
    ],
    data: [
      {
        name: "table",
        values: [28, 55, 43, 91, 81, 53, 19, 87].map((v, i) => ({
          c: cats[i],
          v,
        })),
      },
      // An empty set that only the trigger writes: a row already inside is removed, else inserted.
      { name: "chosen", on: [{ trigger: "picked", toggle: "picked" }] },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "c" },
        range: "width",
        padding: 0.08,
      },
      { name: "y", domain: [0, 100], range: "height" },
    ],
    axes: [{ orient: "bottom", scale: "x" }],
    marks: [
      {
        type: "rect",
        name: "bar",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "c" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "v" },
            y2: { scale: "y", value: 0 },
          },
          update: {
            fill: {
              signal: "indata('chosen', 'c', datum.c) ? 'orange' : 'steelblue'",
            },
          },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { value: 0 },
            y: { value: -2 },
            fill: { value: "#aaa" },
            text: {
              signal:
                "'chosen: ' + (length(data('chosen')) ? join(pluck(data('chosen'), 'c'), ', ') : 'none')",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale("x");
    // Pressing walks a path that picks bars and then un-picks some of them.
    const path = [0, 3, 5, 3, 7, 0, 5, 7, 2, 2];
    stage.every(700, (i) => {
      const c = cats[path[i % path.length] ?? 0] ?? "A";
      ghost.click(x(c) + x.bandwidth() / 2, 140);
    });
  }
  return () => stage.dispose();
};

export default mount;
