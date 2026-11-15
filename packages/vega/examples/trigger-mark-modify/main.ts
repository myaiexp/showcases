// mark triggers: `on` on a mark rewrites the dragged item's own x and y, with no data set involved
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { createStage } from "../../shared/stage.ts";

const homes: [number, number][] = [
  [70, 60],
  [190, 140],
  [310, 70],
  [130, 170],
  [350, 160],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: 8,
    encode: { enter: { fill: { value: "#222c44" } } },
    signals: [
      // The scenegraph item under the pointer while the button is down, null otherwise.
      {
        name: "dragged",
        value: null,
        on: [
          { events: "symbol:mousedown", update: "item()" },
          { events: "window:mouseup", update: "null" },
        ],
      },
      // Where the pointer is: set at the press, then followed until the button comes up.
      {
        name: "pos",
        value: null,
        on: [
          {
            events: "symbol:mousedown",
            update: "{x: x(), y: y()}",
          },
          {
            events: "[symbol:mousedown, window:mouseup] > window:mousemove",
            update: "{x: x(), y: y()}",
          },
        ],
      },
    ],
    data: [{ name: "nodes", values: homes.map(([x, y], i) => ({ i, x, y })) }],
    scales: [
      {
        name: "color",
        type: "ordinal",
        domain: [0, 1, 2, 3, 4],
        range: { scheme: "set2" },
      },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "nodes" },
        encode: {
          // x and y are set once, in enter. The trigger below overwrites them on the item.
          enter: {
            x: { field: "x" },
            y: { field: "y" },
            size: { value: 900 },
            fill: { scale: "color", field: "i" },
            cursor: { value: "grab" },
          },
          hover: { stroke: { value: "#fff" }, strokeWidth: { value: 2 } },
        },
        // Mark triggers support modify only: no insert, remove or toggle.
        on: [
          {
            trigger: "dragged && pos",
            modify: "dragged",
            values: "{x: pos.x, y: pos.y}",
          },
        ],
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 8 },
            y: { value: 16 },
            fill: { value: "#aaa" },
            text: { value: "drag a circle" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    // Each step drags one circle from where it sits to a new spot, then the next step drags it home.
    const at = homes.map(([x, y]) => [x, y] as [number, number]);
    const moved = homes.map(() => false);
    stage.every(1300, (i) => {
      const n = i % homes.length;
      const home = homes[n] ?? [0, 0];
      const from = at[n] ?? home;
      const to: [number, number] = moved[n]
        ? home
        : [home[0] + (n % 2 ? -50 : 50), home[1] + (n % 3 ? -35 : 35)];
      moved[n] = !moved[n];
      at[n] = to;
      return ghost.drag(from, to, 900, 12);
    });
  }
  return () => stage.dispose();
};

export default mount;
