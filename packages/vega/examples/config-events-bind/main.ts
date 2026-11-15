// config events.bind: "any", "container" or "none" decides where signal inputs may appear
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "any" | "container" | "none";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // A box outside the view for the second input to land in: only when the config is "any".
  const side = document.createElement("div");
  side.id = `vg-bind-side-${Math.random().toString(36).slice(2, 8)}`;
  side.style.cssText =
    "margin-top:8px;padding:6px 10px;border:1px dashed #6f8fd0;font-size:13px;color:#aaa;width:100%";
  side.textContent =
    "a box outside the view (a binding with its own element lands here)";
  if (!stage.preview) el.append(side);
  stage.own(() => side.remove());

  const make = (mode: Mode): Spec => {
    const config: Config = { events: { bind: mode } };
    return {
      width: 380,
      height: 150,
      padding: 8,
      config,
      signals: [
        // Goes to the view's binding area in "any" and "container"; suppressed in "none".
        {
          name: "bars",
          value: 6,
          bind: { input: "range", min: 2, max: 10, step: 1 },
        },
        // Names its own element: honoured in "any", sent to the container in "container".
        {
          name: "height1",
          value: 80,
          bind: {
            input: "range",
            min: 20,
            max: 100,
            step: 10,
            ...(stage.preview ? {} : { element: `#${side.id}` }),
          },
        },
      ],
      data: [
        {
          name: "idx",
          transform: [
            { type: "sequence", start: 0, stop: { signal: "bars" }, as: "i" },
          ],
        },
      ],
      scales: [
        {
          name: "x",
          type: "band",
          domain: { data: "idx", field: "i" },
          range: "width",
          padding: 0.15,
        },
        { name: "y", domain: [0, 100], range: "height" },
      ],
      marks: [
        {
          type: "rect",
          from: { data: "idx" },
          encode: {
            update: {
              x: { scale: "x", field: "i" },
              width: { scale: "x", band: 1 },
              y: {
                scale: "y",
                signal: "height1 * (0.4 + 0.6 * abs(sin(datum.i * 1.7)))",
              },
              y2: { scale: "y", value: 0 },
              fill: { value: "steelblue" },
            },
          },
        },
        {
          type: "text",
          encode: {
            enter: {
              x: { value: 4 },
              y: { value: 14 },
              fill: { value: "#e0b252" },
              text: { value: `events.bind: "${mode}"` },
            },
          },
        },
      ],
    };
  };

  const names: Mode[] = ["any", "container", "none"];
  const m = await modes(stage, names, make, { label: "events.bind", ms: 3000 });
  if (stage.preview) {
    // The inputs are hidden in cards, so the chart itself changes: the example steps the signal itself.
    stage.every(700, (i) => {
      const view = m.view();
      view.signal("bars", 3 + (i % 7));
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
