// data triggers insert and remove: every press adds a dot, a double-click clears them all
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: 8,
    encode: {
      enter: { fill: { value: "#222c44" }, stroke: { value: "#56658a" } },
    },
    signals: [
      // The pointer position in the data rectangle (x() and y() count from the view's corner),
      // with a radius that varies a little. force makes a press on the same spot count too.
      {
        name: "press",
        value: null,
        on: [
          {
            events: "mousedown",
            update:
              "{x: x() - padding.left, y: y() - padding.top, r: 5 + round(x() + y()) % 5 * 3}",
            force: true,
          },
        ],
      },
      { name: "wipe", value: 0, on: [{ events: "dblclick", update: "now()" }] },
    ],
    data: [
      {
        // No values and no url: the set starts empty, and only triggers touch it.
        name: "dots",
        on: [
          { trigger: "press", insert: "press" },
          { trigger: "wipe", remove: true },
        ],
      },
    ],
    marks: [
      {
        type: "symbol",
        from: { data: "dots" },
        encode: {
          enter: {
            x: { field: "x" },
            y: { field: "y" },
            size: { signal: "datum.r * datum.r * 3" },
            fill: { value: "orange" },
            fillOpacity: { value: 0.75 },
          },
        },
      },
      {
        type: "text",
        encode: {
          update: {
            x: { value: 8 },
            y: { value: 16 },
            fill: { value: "#aaa" },
            text: {
              signal:
                "length(data('dots')) + ' dots  (press to add, double-click to clear)'",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    // A pretend pointer presses at scattered spots and double-clicks to clear every ninth step.
    const ghost = stage.ghost(view);
    stage.every(450, (i) => {
      if (i % 9 === 0) ghost.dblclick(210, 110);
      else ghost.click(30 + ((i * 97) % 360), 40 + ((i * 53) % 160));
    });
  }
  return () => stage.dispose();
};

export default mount;
