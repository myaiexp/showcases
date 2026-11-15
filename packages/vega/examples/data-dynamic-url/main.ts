// signal-valued url and format: change a signal and the data set reloads from another file
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 170,
    padding: 8,
    signals: [
      {
        name: "file",
        value: "points.json",
        bind: {
          input: "select",
          options: ["points.json", "stocks.csv", "airports.csv"],
        },
      },
      // The format's type follows the file name.
      { name: "kind", update: "indexof(file, '.csv') >= 0 ? 'csv' : 'json'" },
    ],
    data: [
      // Both url and format.type read signals, so changing `file` fetches and re-parses. The first
      // pass runs on an empty set: everything downstream copes with no rows.
      {
        name: "src",
        url: { signal: "'data/' + file" }, // The format type reads a signal (documented, but the Spec type only lists literal types).
        format: { type: { signal: "kind" } } as never,
      },
      {
        name: "head",
        source: "src",
        transform: [
          { type: "window", ops: ["row_number"], as: ["n"] },
          { type: "filter", expr: "datum.n <= 9" },
        ],
      },
    ],
    marks: [
      {
        type: "text",
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 12 },
            fill: { value: "#e0b252" },
            text: {
              signal:
                "'url: data/' + file + '   format: ' + kind + '   rows: ' + length(data('src'))",
            },
          },
        },
      },
      {
        type: "text",
        from: { data: "head" },
        encode: {
          update: {
            x: { value: 0 },
            y: { signal: "14 + datum.n * 16" },
            fontSize: { value: 11 },
            // A summary line that fits whichever file is loaded.
            text: {
              signal:
                "isValid(datum.symbol) ? datum.symbol + ', ' + datum.date + ', ' + datum.price : isValid(datum.iata) ? datum.iata + ', ' + datum.name + ', ' + datum.state : 'x = ' + format(datum.x, '.3f') + ', y = ' + format(datum.y, '.3f')",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(
    stage,
    view,
    "file",
    ["stocks.csv", "airports.csv", "points.json"],
    1800,
  );
  return () => stage.dispose();
};

export default mount;
