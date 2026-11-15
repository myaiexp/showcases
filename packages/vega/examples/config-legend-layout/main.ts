// config legend.layout: how legends that share an orient are stacked, anchored and spaced
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "default" | "bottom: vertical, centred" | "bottom: right-anchored";
const configs: Record<Mode, Config> = {
  default: {},
  // Sub-objects of layout are keyed by orient: stack the bottom legends vertically with 2px margins,
  // anchor them to the middle of the chart and centre them in their area.
  "bottom: vertical, centred": {
    legend: {
      layout: {
        bottom: {
          anchor: "middle",
          direction: "vertical",
          center: true,
          margin: 2,
        },
      },
    },
  },
  "bottom: right-anchored": {
    legend: {
      layout: {
        bottom: {
          anchor: "end",
          direction: "horizontal",
          margin: 30,
          offset: 14,
        },
      },
    },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 360,
    height: 110,
    padding: 8,
    config: configs[mode],
    scales: [
      { name: "x", type: "linear", domain: [0, 10], range: "width" },
      {
        name: "color",
        type: "ordinal",
        domain: ["alpha", "beta", "gamma"],
        range: ["#6f8fd0", "#e0b252", "#6ec6a5"],
      },
      {
        name: "shape",
        type: "ordinal",
        domain: ["one", "two"],
        range: ["circle", "square"],
      },
      { name: "size", type: "linear", domain: [0, 10], range: [20, 200] },
    ],
    axes: [{ orient: "bottom", scale: "x" }],
    // Three legends with the same orient: the layout config decides how they sit together.
    legends: [
      { orient: "bottom", fill: "color", title: "colour" },
      { orient: "bottom", shape: "shape", stroke: "color", title: "shape" },
      { orient: "bottom", size: "size", title: "size" },
    ],
    marks: [
      {
        type: "text",
        encode: {
          enter: {
            x: { signal: "width / 2" },
            y: { value: 40 },
            align: { value: "center" },
            fontSize: { value: 14 },
            text: { value: `legend.layout: ${mode}` },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "legend.layout",
    ms: 2600,
  });
  return () => stage.dispose();
};

export default mount;
