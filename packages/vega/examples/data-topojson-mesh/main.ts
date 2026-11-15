// topojson format with `mesh` and `filter`: borders as one shape, interior only or exterior only
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "no filter" | "interior" | "exterior";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 460,
    height: 280,
    padding: 4,
    data: [
      {
        name: "land",
        url: "data/us-10m.json",
        format: { type: "topojson", feature: "land" },
      },
      {
        name: "borders",
        url: "data/us-10m.json",
        // One unified line shape for all state borders, not a feature per state. `filter` keeps the
        // lines shared by two states ("interior") or the outline ("exterior").
        format: {
          type: "topojson",
          mesh: "states",
          filter: mode === "no filter" ? null : mode,
        },
      },
    ],
    projections: [
      {
        name: "projection",
        type: "albersUsa",
        fit: { signal: "data('land')" },
        size: { signal: "[width, height]" },
      },
    ],
    marks: [
      {
        type: "shape",
        from: { data: "land" },
        encode: { enter: { fill: { value: "#22344a" } } },
        transform: [{ type: "geoshape", projection: "projection" }],
      },
      {
        type: "shape",
        from: { data: "borders" },
        encode: {
          enter: {
            fill: { value: null },
            stroke: { value: mode === "exterior" ? "#e0b252" : "#9bb3d0" },
            strokeWidth: { value: mode === "exterior" ? 2 : 1 },
          },
        },
        transform: [{ type: "geoshape", projection: "projection" }],
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 4 },
            y: { value: 14 },
            text: {
              value: `mesh: "states", filter: ${mode === "no filter" ? "unset" : `"${mode}"`}`,
            },
          },
        },
      },
    ],
  });

  await modes(stage, ["no filter", "interior", "exterior"] as Mode[], make, {
    label: "mesh filter",
    ms: 2200,
  });
  return () => stage.dispose();
};

export default mount;
