// config title: size, offset, anchor, orient and subtitle colour for every title at once
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "built-in" | "start-anchored" | "bottom, group frame";
const configs: Record<Mode, Config> = {
  "built-in": {},
  "start-anchored": {
    title: {
      anchor: "start",
      fontSize: 20,
      offset: 16,
      color: "#e0b252",
      subtitleColor: "#aaa",
      subtitleFontSize: 12,
    },
  },
  "bottom, group frame": {
    title: {
      orient: "bottom",
      anchor: "end",
      frame: "group",
      fontSize: 16,
      fontWeight: "normal",
      offset: 12,
      subtitleColor: "#6ec6a5",
    },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 130,
    padding: 8,
    config: configs[mode],
    // The title sets only its text; where it sits and how it looks comes from the config.
    title: { text: "Monthly visitors", subtitle: "thousands, 2024" },
    data: [
      {
        name: "table",
        values: [3, 5, 4, 7, 9, 8, 11, 10].map((v, i) => ({ i, v })),
      },
    ],
    scales: [
      {
        name: "x",
        type: "band",
        domain: { data: "table", field: "i" },
        range: "width",
        padding: 0.2,
      },
      { name: "y", domain: [0, 12], range: "height" },
    ],
    axes: [{ orient: "left", scale: "y", tickCount: 4 }],
    marks: [
      {
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "i" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "v" },
            y2: { scale: "y", value: 0 },
            fill: { value: "steelblue" },
          },
        },
      },
    ],
  });

  await modes(stage, Object.keys(configs) as Mode[], make, {
    label: "config.title",
    ms: 2500,
  });
  return () => stage.dispose();
};

export default mount;
