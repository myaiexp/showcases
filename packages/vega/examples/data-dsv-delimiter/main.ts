// format dsv with `delimiter`: any single-character separator, here a pipe, with a header row
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

// Pipe-separated, with its own header line. Commas inside a field are just text here.
const piped = [
  "city|country|visitors",
  "Lisbon, old town|PT|4.2",
  "Kyoto|JP|7.9",
  "Oslo|NO|2.6",
  "Lima|PE|3.4",
  "Cairo|EG|5.8",
].join("\n");

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 380,
    height: 170,
    padding: 8,
    signals: [
      {
        name: "atLeast",
        value: 0,
        bind: { input: "range", min: 0, max: 7, step: 0.5 },
      },
    ],
    data: [
      // The docs allow a delimited string as `values`; the Spec type only lists arrays and objects.
      {
        name: "cities",
        values: piped as unknown as object[],
        format: { type: "dsv", delimiter: "|", parse: { visitors: "number" } },
      },
      {
        name: "kept",
        source: "cities",
        transform: [{ type: "filter", expr: "datum.visitors >= atLeast" }],
      },
    ],
    scales: [
      {
        name: "y",
        type: "band",
        domain: { data: "cities", field: "city" },
        range: "height",
        padding: 0.2,
      },
      { name: "x", domain: [0, 10], range: "width" },
    ],
    axes: [
      {
        orient: "left",
        scale: "y",
        domain: false,
        ticks: false,
        labelLimit: 130,
      },
      { orient: "bottom", scale: "x", title: "visitors (millions)" },
    ],
    marks: [
      {
        type: "rect",
        from: { data: "kept" },
        encode: {
          update: {
            y: { scale: "y", field: "city" },
            height: { scale: "y", band: 1 },
            x: { value: 0 },
            x2: { scale: "x", field: "visitors" },
            fill: { value: "steelblue" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "atLeast", [3, 4.5, 6, 7.5, 0], 1000);
  return () => stage.dispose();
};

export default mount;
