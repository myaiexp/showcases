// config projection: the default projection type for any projection that does not name one
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "equalEarth" | "orthographic" | "mercator" | "azimuthalEqualArea";
const types: Mode[] = [
  "equalEarth",
  "orthographic",
  "mercator",
  "azimuthalEqualArea",
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => {
    // Any legal projection property goes here; "type" is the common one.
    const config: Config = { projection: { type: mode } };
    return {
      width: 420,
      height: 230,
      padding: 4,
      config,
      data: [
        {
          name: "countries",
          url: "data/world-110m.json",
          format: { type: "topojson", feature: "countries" },
        },
      ],
      // The projection names no type, so it takes the configured one. fit scales it to the data.
      projections: [
        {
          name: "proj",
          fit: { signal: "data('countries')" },
          size: { signal: "[width, height]" },
        },
      ],
      marks: [
        {
          type: "shape",
          from: { data: "countries" },
          encode: {
            enter: {
              fill: { value: "#3f6f5e" },
              stroke: { value: "#9ad6bf" },
              strokeWidth: { value: 0.4 },
            },
          },
          transform: [{ type: "geoshape", projection: "proj" }],
        },
        {
          type: "text",
          encode: {
            enter: {
              x: { value: 4 },
              y: { value: 12 },
              text: { value: `projection.type: ${mode}` },
            },
          },
        },
      ],
    };
  };

  await modes(stage, types, make, { label: "projection.type", ms: 2400 });
  return () => stage.dispose();
};

export default mount;
