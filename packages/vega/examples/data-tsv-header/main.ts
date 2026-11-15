// format tsv with `header`: field names for a file that has none, plotted as labelled points
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

// Tab-separated rows with no header line of their own.
const tsv = [
  "Aster\t2\t7",
  "Birch\t5\t3",
  "Cedar\t8\t8",
  "Dill\t3\t5",
  "Elm\t9\t2",
  "Fern\t6\t6",
].join("\n");

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 380,
    height: 190,
    padding: 8,
    signals: [
      {
        name: "minY",
        value: 0,
        bind: { input: "range", min: 0, max: 8, step: 1 },
      },
    ],
    data: [
      {
        name: "plants",
        values: tsv as unknown as object[], // the docs allow a CSV/TSV string here; the Spec type only lists arrays and objects
        // `header` is prepended as the first row, so the first data line is read as data, not names.
        format: {
          type: "tsv",
          header: ["name", "x", "y"],
          parse: { x: "number", y: "number" },
        },
      },
      {
        name: "kept",
        source: "plants",
        transform: [{ type: "filter", expr: "datum.y >= minY" }],
      },
    ],
    scales: [
      { name: "x", type: "linear", domain: [0, 10], range: "width" },
      { name: "y", type: "linear", domain: [0, 10], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x", title: "x" },
      { orient: "left", scale: "y", title: "y" },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "kept" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
            size: { value: 110 },
            fill: { value: "#6ec6a5" },
          },
        },
      },
      {
        type: "text",
        from: { data: "kept" },
        encode: {
          enter: {
            x: { scale: "x", field: "x", offset: 10 },
            y: { scale: "y", field: "y" },
            baseline: { value: "middle" },
            text: { field: "name" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "minY", [3, 5, 7, 0], 1000);
  return () => stage.dispose();
};

export default mount;
