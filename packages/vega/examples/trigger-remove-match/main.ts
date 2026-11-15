// data trigger remove with an object: a predicate that removes every row sharing the pressed row's group
import * as vega from "vega";
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { rng } from "../../shared/cards.ts";
import { button } from "../../shared/controls.ts";
import { createStage } from "../../shared/stage.ts";

const groups = ["north", "south", "east"] as const;

function makeRows(
  seed: number,
): { id: number; g: string; x: number; y: number }[] {
  const rand = rng(seed);
  return Array.from({ length: 18 }, (_, id) => ({
    id,
    g: groups[id % 3] ?? "north",
    x: 20 + rand() * 360,
    y: 20 + rand() * 170,
  }));
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = makeRows(8);

  const spec: Spec = {
    width: 400,
    height: 210,
    padding: 8,
    encode: { enter: { fill: { value: "#222c44" } } },
    signals: [
      {
        name: "picked",
        value: null,
        on: [{ events: "@dot:mousedown", update: "datum", force: true }],
      },
    ],
    data: [
      {
        name: "items",
        values: rows,
        // An object result is a predicate: every row whose g equals the pressed row's g goes.
        on: [{ trigger: "picked", remove: "{g: picked.g}" }],
      },
    ],
    scales: [
      {
        name: "color",
        type: "ordinal",
        domain: [...groups],
        range: ["#6f8fd0", "#e0b252", "#6ec6a5"],
      },
    ],
    legends: [{ fill: "color", orient: "right" }],
    marks: [
      {
        type: "symbol",
        name: "dot",
        from: { data: "items" },
        encode: {
          enter: {
            x: { field: "x" },
            y: { field: "y" },
            size: { value: 260 },
            fill: { scale: "color", field: "g" },
          },
          hover: { stroke: { value: "#fff" }, strokeWidth: { value: 2 } },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { value: 8 },
            y: { value: 16 },
            fill: { value: "#aaa" },
            text: { signal: "length(data('items')) + ' rows left'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  // The spec only removes. Putting the rows back is the page's job (View API change).
  const refill = (): Promise<void> =>
    view
      .change(
        "items",
        vega
          .changeset()
          .remove(() => true)
          .insert(makeRows(8)),
      )
      .runAsync()
      .then(() => undefined);
  if (stage.bar) button(stage.bar, "Put the rows back", () => void refill());
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(900, (i) => {
      const left = view.data("items") as { g: string; x: number; y: number }[];
      const next = left[i % Math.max(1, left.length)];
      if (!next) return refill();
      ghost.click(next.x, next.y);
      return undefined;
    });
  }
  return () => stage.dispose();
};

export default mount;
