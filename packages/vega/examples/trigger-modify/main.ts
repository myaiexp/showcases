// data trigger modify with values: pressing a bar rewrites its row, and the chart follows
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const cats = "ABCDEF";

  const spec: Spec = {
    width: 400,
    height: 180,
    padding: 8,
    signals: [
      {
        name: "picked",
        value: null,
        on: [{ events: "@bar:mousedown", update: "datum", force: true }],
      },
    ],
    data: [
      {
        name: "table",
        values: [20, 45, 30, 70, 55, 10].map((v, i) => ({ c: cats[i], v })),
        // modify names the row to change, values the fields to overwrite: here, 25 more, wrapping at 100.
        on: [
          {
            trigger: "picked",
            modify: "picked",
            values: "{v: picked.v >= 90 ? 10 : picked.v + 25}",
          },
        ],
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "c" },
        range: "width",
        padding: 0.12,
      },
      { name: "y", domain: [0, 100], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y", tickCount: 5 },
    ],
    marks: [
      {
        type: "rect",
        name: "bar",
        from: { data: "table" },
        encode: {
          update: {
            x: { scale: "x", field: "c" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "v" },
            y2: { scale: "y", value: 0 },
            fill: { value: "steelblue" },
          },
          hover: { fill: { value: "orange" } },
        },
      },
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
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale("x");
    const path = [3, 0, 3, 4, 3, 1, 5, 3, 2];
    stage.every(650, (i) => {
      const c = cats[path[i % path.length] ?? 0] ?? "A";
      ghost.click(x(c) + x.bandwidth() / 2, 175);
    });
  }
  return () => stage.dispose();
};

export default mount;
