// description and usermeta: text the view keeps (aria-label) and metadata Vega ignores
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { readout } from "../../shared/controls.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    // In Vega 5.10 and later the description becomes the container's aria-label.
    description:
      "A sine wave that slides to the right: the phase signal moves it.",
    // usermeta is carried along with the spec and never read by the parser.
    usermeta: { author: "showcase", revision: 3, tags: ["wave", "demo"] },
    width: 420,
    height: 160,
    padding: 8,
    signals: [
      {
        name: "phase",
        value: 0,
        bind: { input: "range", min: 0, max: 6.28, step: 0.05 },
      },
    ],
    data: [
      {
        name: "xs",
        transform: [
          { type: "sequence", start: 0, stop: 12.6, step: 0.2, as: "x" },
        ],
      },
    ],
    scales: [
      { name: "x", type: "linear", domain: [0, 12.6], range: "width" },
      { name: "y", type: "linear", domain: [-1.2, 1.2], range: "height" },
    ],
    axes: [{ orient: "bottom", scale: "x" }],
    marks: [
      {
        type: "line",
        from: { data: "xs" },
        encode: {
          update: {
            x: { scale: "x", field: "x" },
            y: { scale: "y", signal: "sin(datum.x - phase)" },
            stroke: { value: "steelblue" },
            strokeWidth: { value: 2.5 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "phase", [0.8, 1.6, 2.4, 3.2, 4, 4.8, 5.6, 0], 600);
  if (stage.preview === false) {
    // The full view reads both back: the aria-label from the container, usermeta from the spec itself.
    const out = readout(el);
    const label = view.container()?.getAttribute("aria-label") ?? "(none)";
    out.textContent = `aria-label: ${label}\nusermeta: ${JSON.stringify(spec.usermeta)}`;
  }
  return () => stage.dispose();
};

export default mount;
