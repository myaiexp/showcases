// autosize.contains: do width and height mean the data rectangle ("content") or the whole view ("padding")?
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Contains = "content" | "padding";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (contains: Contains): Spec => ({
    width: 360,
    height: 160,
    padding: { left: 50, right: 50, top: 20, bottom: 30 },
    // `none` does no layout of its own, so the only size rule left is `contains`: with "content" the
    // view is width + padding wide (460), with "padding" it is exactly width (360) and the data
    // rectangle gets smaller by the padding.
    autosize: { type: "none", contains },
    background: "#1a2030",
    encode: { enter: { fill: { value: "#2c3a5a" } } },
    marks: [
      {
        type: "text",
        encode: {
          enter: {
            x: { field: { group: "width" }, mult: 0.5 },
            y: { field: { group: "height" }, mult: 0.5 },
            align: { value: "center" },
            baseline: { value: "middle" },
            fontSize: { value: 15 },
            text: { value: `contains: ${contains}` },
          },
        },
      },
      // Group width and height are the data rectangle as drawn: a rule along its bottom and right
      // edges makes the shrinkage easy to see. (The width signal still says 360 in both modes.)
      {
        type: "rule",
        encode: {
          enter: {
            x: { value: 0 },
            x2: { field: { group: "width" } },
            y: { field: { group: "height" }, offset: -6 },
            stroke: { value: "#e0b252" },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: "rule",
        encode: {
          enter: {
            x: { field: { group: "width" }, offset: -6 },
            y: { value: 0 },
            y2: { field: { group: "height" } },
            stroke: { value: "#e0b252" },
            strokeWidth: { value: 2 },
          },
        },
      },
    ],
  });

  // Cards alternate the two settings; the full view has a select.
  await modes(stage, ["content", "padding"] as Contains[], make, {
    label: "contains",
    ms: 2000,
  });
  return () => stage.dispose();
};

export default mount;
