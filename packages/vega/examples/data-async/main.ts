// data.async: two files load in the background, so the chart and its signals stay responsive
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 100,
    padding: 8,
    signals: [
      {
        name: "year",
        value: 2005,
        bind: { input: "range", min: 2000, max: 2009, step: 1 },
      },
    ],
    data: [
      // async: true lets the dataflow finish its first pass with these sets empty, then reruns when
      // each file has arrived. Without it the first pass waits for both files.
      {
        name: "stocks",
        url: "data/stocks.csv",
        async: true,
        format: { type: "csv", parse: { date: "date", price: "number" } },
      },
      {
        name: "airports",
        url: "data/airports.csv",
        async: true,
        format: { type: "csv", parse: { latitude: "number" } },
      },
      {
        name: "msft",
        source: "stocks",
        transform: [
          { type: "filter", expr: "datum.symbol === 'MSFT'" },
          { type: "formula", as: "when", expr: "toDate(datum.date)" },
        ],
      },
    ],
    scales: [
      // Fixed domains: the sets are empty on the first pass, and an empty extent would warn.
      {
        name: "x",
        type: "time",
        domain: { signal: "[datetime(2000, 0, 1), datetime(2010, 2, 1)]" },
        range: "width",
      },
      { name: "y", domain: [0, 120], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y", tickCount: 3 },
    ],
    marks: [
      {
        type: "line",
        from: { data: "msft" },
        encode: {
          enter: {
            x: { scale: "x", field: "when" },
            y: { scale: "y", field: "price" },
            stroke: { value: "steelblue" },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: "rule",
        encode: {
          update: {
            x: { scale: "x", signal: "datetime(year, 0, 1)" },
            y: { value: 0 },
            y2: { signal: "height" },
            stroke: { value: "orange" },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { signal: "width" },
            y: { value: 10 },
            align: { value: "right" },
            text: {
              signal:
                "length(data('stocks')) + ' stock rows, ' + length(data('airports')) + ' airport rows'",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "year", [2001, 2003, 2005, 2007, 2009, 2000], 900);
  return () => stage.dispose();
};

export default mount;
