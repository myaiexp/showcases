// Top-level encode: styles the chart's data rectangle (a group mark) apart from the view background
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 190,
    padding: 10,
    signals: [
      {
        name: "tint",
        value: "#2c3a5a",
        bind: {
          input: "select",
          options: ["#2c3a5a", "#3b2c5a", "#2c5a42", "#5a3b2c"],
        },
      },
    ],
    // The group's enter, update and hover sets work like any mark's: the plot area takes a fill,
    // a stroke and (through a signal) a colour that changes while the view's background does not.
    encode: {
      update: {
        fill: { signal: "tint" },
        stroke: { value: "#8aa0d0" },
        strokeWidth: { value: 1 },
        cornerRadius: { value: 6 },
      },
      hover: { stroke: { value: "#e0b252" }, strokeWidth: { value: 2 } },
    },
    data: [
      {
        name: "pts",
        values: [
          { x: 1, y: 3 },
          { x: 2, y: 8 },
          { x: 3, y: 5 },
          { x: 4, y: 9 },
          { x: 5, y: 2 },
          { x: 6, y: 7 },
        ],
      },
    ],
    scales: [
      { name: "x", type: "linear", domain: [0, 7], range: "width" },
      { name: "y", type: "linear", domain: [0, 10], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x" },
      { orient: "left", scale: "y" },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "pts" },
        encode: {
          enter: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", field: "y" },
            size: { value: 120 },
            fill: { value: "orange" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(
    stage,
    view,
    "tint",
    ["#3b2c5a", "#2c5a42", "#5a3b2c", "#2c3a5a"],
    1200,
  );
  return () => stage.dispose();
};

export default mount;
