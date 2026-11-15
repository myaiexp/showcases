// data.source: derive a set from one named set, or merge several (union) into one
import * as vega from "vega";
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { rng } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 180,
    padding: 8,
    data: [
      { name: "left", values: [{ v: 12 }, { v: 40 }, { v: 25 }] },
      { name: "right", values: [{ v: 70 }, { v: 55 }, { v: 90 }] },
      // An array of names: the rows of both sets, one after the other.
      { name: "both", source: ["left", "right"] },
      // A single name, plus a transform: only the large values of the merged set.
      {
        name: "large",
        source: "both",
        transform: [{ type: "filter", expr: "datum.v >= 50" }],
      },
    ],
    scales: [
      { name: "x", type: "linear", domain: [0, 100], range: "width" },
      {
        name: "row",
        type: "band",
        domain: ["left", "right", "both", "large"],
        range: "height",
        padding: 0.3,
      },
    ],
    axes: [
      { orient: "left", scale: "row", domain: false, ticks: false },
      { orient: "bottom", scale: "x" },
    ],
    marks: [
      ...(
        [
          { name: "left", fill: "#6f8fd0" },
          { name: "right", fill: "#e0b252" },
          { name: "both", fill: "#6ec6a5" },
          { name: "large", fill: "#c97ab0" },
        ] as const
      ).map(({ name, fill }) => ({
        type: "symbol" as const,
        from: { data: name },
        encode: {
          enter: {
            x: { scale: "x", field: "v" },
            y: { scale: "row", value: name, band: 0.5 },
            size: { value: 150 },
            fill: { value: fill },
            fillOpacity: { value: 0.85 },
          },
        },
      })),
    ],
  };

  const view = await stage.render(spec);
  // Cards add a value to either source every step; "both" and "large" follow without being told.
  if (stage.preview) {
    const rand = rng(11);
    stage.every(700, (i) => {
      const target = i % 2 ? "left" : "right";
      const cs = vega.changeset().insert([{ v: Math.round(rand() * 100) }]);
      if (i % 3 === 0) cs.remove(() => true).insert([{ v: 20 }, { v: 80 }]);
      return view
        .change(target, cs)
        .runAsync()
        .then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
