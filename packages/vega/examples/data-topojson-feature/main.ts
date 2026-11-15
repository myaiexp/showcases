// topojson format with `feature`: one GeoJSON feature per state from the us-10m file
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { cycle } from "../../shared/cards.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 280,
    padding: 4,
    signals: [
      {
        name: "fips",
        value: 6,
        bind: {
          input: "select",
          options: [6, 48, 36, 12, 17, 53, 27, 4, 8, 13],
        },
      },
    ],
    data: [
      // `feature` names the object set to convert; each state arrives as its own row with an id.
      {
        name: "states",
        url: "data/us-10m.json",
        format: { type: "topojson", feature: "states" },
      },
    ],
    projections: [
      {
        name: "projection",
        type: "albersUsa",
        fit: { signal: "data('states')" },
        size: { signal: "[width, height]" },
      },
    ],
    marks: [
      {
        type: "shape",
        from: { data: "states" },
        encode: {
          update: {
            fill: { signal: 'datum.id === fips ? "orange" : "#34506e"' },
            stroke: { value: "#9bb3d0" },
            strokeWidth: { value: 0.6 },
          },
        },
        transform: [{ type: "geoshape", projection: "projection" }],
      },
      {
        type: "text",
        encode: {
          update: {
            x: { value: 4 },
            y: { value: 14 },
            fill: { value: "#ddd" },
            text: {
              signal:
                "'state id (fips) ' + fips + ', ' + length(data('states')) + ' features'",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, "fips", [48, 36, 12, 17, 53, 27, 4, 8, 13, 6], 800);
  return () => stage.dispose();
};

export default mount;
