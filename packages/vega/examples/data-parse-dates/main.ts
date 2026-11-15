// parse "date:'format'" and "utc:'format'": read dates written in custom layouts (d3-time-format)
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

// The same three days, spelled in two layouts the default parser would not read.
const compact = `day,stamp,sales
03152024,2024-03-15 09:30,12
03222024,2024-03-22 18:05,19
03292024,2024-03-29 12:45,15`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 160,
    padding: 8,
    signals: [
      {
        name: "row",
        value: 0,
        bind: { input: "range", min: 0, max: 2, step: 1 },
      },
    ],
    data: [
      {
        name: "sales",
        values: compact as unknown as object[], // the docs allow a CSV/TSV string here; the Spec type only lists arrays and objects
        format: {
          type: "csv",
          // "date:" reads in local time, "utc:" in UTC; the pattern is d3-time-format's.
          parse: {
            day: "date:'%m%d%Y'",
            stamp: "utc:'%Y-%m-%d %H:%M'",
            sales: "number",
          },
        },
        transform: [{ type: "window", ops: ["row_number"], as: ["n"] }],
      },
    ],
    scales: [
      {
        name: "x",
        type: "time",
        domain: { signal: "[datetime(2024, 2, 13), datetime(2024, 3, 1)]" },
        range: "width",
      },
      { name: "y", domain: [0, 60], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x", format: "%b %e" },
      { orient: "left", scale: "y", tickCount: 3 },
    ],
    marks: [
      // Bars sit at the parsed `day` dates; the highlighted one is the row the slider names.
      {
        type: "rect",
        from: { data: "sales" },
        encode: {
          update: {
            xc: { scale: "x", field: "day" },
            width: { value: 24 },
            y: { scale: "y", field: "sales" },
            y2: { scale: "y", value: 0 },
            fill: { signal: 'datum.n - 1 === row ? "orange" : "steelblue"' },
          },
        },
      },
      {
        type: "text",
        from: { data: "sales" },
        encode: {
          update: {
            x: { value: 0 },
            y: { signal: "(datum.n - 1) * 15 + 10" },
            fontSize: { value: 11 },
            fill: { signal: 'datum.n - 1 === row ? "orange" : "#aaa"' },
            text: {
              signal:
                "timeFormat(datum.day, '%a %e %b') + ' (day)    ' + utcFormat(datum.stamp, '%H:%M UTC') + ' (stamp)'",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "row", [1, 2, 0], 1100);
  return () => stage.dispose();
};

export default mount;
