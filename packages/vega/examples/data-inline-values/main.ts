// data.values: an array of plain numbers becomes rows with a `data` field; objects stay as written
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { rng } from "../../shared/cards.ts";
import { reshuffle, rowsOf, tableMarks } from "../../shared/basic-kit.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 160,
    padding: 8,
    data: [
      // The docs' own example: plain numbers. Vega loads each as {"data": 12} and so on.
      { name: "table", values: [12, 23, 47, 6, 52, 19] },
      // The same rows numbered, only so the text table on the right can place them.
      rowsOf("listed", "table"),
      // Objects are used as they come, here with two fields.
      {
        name: "people",
        values: [
          { who: "Ada", age: 36 },
          { who: "Bo", age: 52 },
          { who: "Cy", age: 29 },
        ],
      },
      rowsOf("people_rows", "people"),
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "listed", field: "_r" },
        range: "width",
        padding: 0.15,
      },
      { name: "y", domain: [0, 60], range: "height" },
    ],
    axes: [{ orient: "bottom", scale: "x", title: "row" }],
    marks: [
      // The bar height reads the field named `data`.
      {
        type: "rect",
        from: { data: "listed" },
        encode: {
          enter: {
            x: { scale: "x", field: "_r" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "data" },
            y2: { scale: "y", value: 0 },
            fill: { value: "steelblue" },
          },
        },
      },
      ...tableMarks(
        "listed",
        [
          { field: "_r", title: "row", width: 40 },
          { field: "data", title: "data", width: 50 },
        ],
        { gap: 24 },
      ),
      ...tableMarks(
        "people_rows",
        [
          { field: "who", title: "who", width: 40 },
          { field: "age", title: "age" },
        ],
        { gap: 160, top: 0 },
      ),
    ],
  };

  const view = await stage.render(spec);
  const rand = rng(5);
  // Fresh numbers go in as {data: n} rows, the shape Vega itself makes from plain numbers.
  reshuffle(
    stage,
    view,
    "table",
    () =>
      Array.from({ length: 6 }, () => ({ data: Math.round(4 + rand() * 54) })),
    1600,
  );
  return () => stage.dispose();
};

export default mount;
