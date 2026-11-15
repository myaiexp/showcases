// format.property and format.copy: dig rows out of a wrapped JSON object, and keep the input unmodified
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { readout } from "../../shared/controls.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Two JSON documents with the same rows, wrapped in surrounding structure.
  const rows = () => [
    { k: "a", v: 4 },
    { k: "b", v: 9 },
    { k: "c", v: 6 },
    { k: "d", v: 7 },
  ];
  const plain = { meta: { generated: "today" }, result: { rows: rows() } };
  const copied = { meta: { generated: "today" }, result: { rows: rows() } };

  const spec: Spec = {
    width: 340,
    height: 150,
    padding: 8,
    signals: [
      {
        name: "factor",
        value: 1,
        bind: { input: "range", min: 0.5, max: 2, step: 0.1 },
      },
    ],
    data: [
      // property digs `result.rows` out of the object. Without copy, Vega uses those very row
      // objects, so the formula below writes `scaled` onto the input document.
      {
        name: "direct",
        values: plain,
        format: { type: "json", property: "result.rows" },
        transform: [
          { type: "formula", as: "scaled", expr: "datum.v * factor" },
        ],
      },
      // copy: true clones the rows first, so the input document stays as it was.
      {
        name: "cloned",
        values: copied,
        format: { type: "json", property: "result.rows", copy: true },
        transform: [
          { type: "formula", as: "scaled", expr: "datum.v * factor" },
        ],
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: ["a", "b", "c", "d"],
        range: "width",
        padding: 0.2,
      },
      { name: "y", domain: [0, 20], range: "height" },
    ],
    axes: [{ orient: "bottom", scale: "x" }],
    marks: [
      {
        type: "rect",
        from: { data: "direct" },
        encode: {
          update: {
            x: { scale: "x", field: "k" },
            width: { scale: "x", band: 0.45 },
            y: { scale: "y", field: "scaled" },
            y2: { scale: "y", value: 0 },
            fill: { value: "steelblue" },
          },
        },
      },
      {
        type: "rect",
        from: { data: "cloned" },
        encode: {
          update: {
            x: { signal: "scale('x', datum.k) + bandwidth('x') * 0.5" },
            width: { scale: "x", band: 0.45 },
            y: { scale: "y", field: "scaled" },
            y2: { scale: "y", value: 0 },
            fill: { value: "orange" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "factor", [1.6, 0.8, 2, 1.2], 1100);
  if (!stage.preview) {
    const out = readout(el);
    const show = (): void => {
      const a = plain.result.rows[0] as Record<string, unknown>;
      const b = copied.result.rows[0] as Record<string, unknown>;
      out.textContent = `direct input row 0: ${JSON.stringify(a)}\ncopied input row 0: ${JSON.stringify(b)}`;
    };
    show();
    view.addDataListener("cloned", show);
  }
  return () => stage.dispose();
};

export default mount;
