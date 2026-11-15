// config view properties: background, group fill, padding and lineBreak, set once for the whole spec
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "built-in defaults" | "view config";

// The view-level properties from the Config reference: background, padding, group, lineBreak.
const viewConfig: Config = {
  background: "#1c2538",
  padding: { left: 30, right: 30, top: 18, bottom: 18 },
  // Default properties of the top-level group mark: the chart's plotting area.
  group: { fill: "#2f4a3a", stroke: "#6ec6a5", strokeWidth: 1.5 },
  // Text marks break their string at this delimiter unless they say otherwise.
  lineBreak: "|",
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 170,
    // Same spec in both modes: only the config differs. Without a config the padding is 5,
    // the plotting area is transparent and "|" is just a character.
    config: mode === "view config" ? viewConfig : {},
    marks: [
      {
        type: "text",
        encode: {
          enter: {
            x: { signal: "width / 2" },
            y: { signal: "height / 2" },
            align: { value: "center" },
            baseline: { value: "middle" },
            fontSize: { value: 18 },
            lineHeight: { value: 24 },
            text: {
              value:
                "One config object|sets the view, the plot area|and the line breaks",
            },
          },
        },
      },
    ],
  });

  await modes(stage, ["built-in defaults", "view config"] as Mode[], make, {
    label: "config",
    ms: 2200,
  });
  return () => stage.dispose();
};

export default mount;
