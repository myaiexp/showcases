// width, height and padding: the data rectangle, and the margin added around it
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    description: "The data rectangle and its padding.",
    width: 360,
    height: 180,
    // An object pads each side on its own; a number would pad all four alike.
    padding: { left: 30, top: 14, right: 70, bottom: 36 },
    // The view background fills the padding too; the top-level `encode` fills only the data rectangle.
    background: "#1a2030",
    encode: {
      enter: { fill: { value: "#2c3a5a" }, stroke: { value: "#6f8fd0" } },
    },

    marks: [
      // The width signal is the data rectangle's width: a dimension line along the bottom edge.
      {
        type: "rule",
        encode: {
          enter: {
            x: { value: 0 },
            y: { signal: "height + 18" },
            x2: { signal: "width" },
            stroke: { value: "#e0b252" },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { signal: "width / 2" },
            y: { signal: "height + 30" },
            align: { value: "center" },
            fill: { value: "#e0b252" },
            text: { signal: "'width = ' + width" },
          },
        },
      },
      {
        type: "rule",
        encode: {
          enter: {
            x: { signal: "width + 20" },
            y: { value: 0 },
            y2: { signal: "height" },
            stroke: { value: "#e0b252" },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { signal: "width + 26" },
            y: { signal: "height / 2" },
            baseline: { value: "middle" },
            fill: { value: "#e0b252" },
            text: { signal: "'height = ' + height" },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { signal: "width / 2" },
            y: { signal: "height / 2" },
            align: { value: "center" },
            baseline: { value: "middle" },
            fontSize: { value: 14 },
            text: {
              signal:
                "'padding: ' + padding.left + ' / ' + padding.top + ' / ' + padding.right + ' / ' + padding.bottom",
            },
          },
        },
      },
    ],
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;
