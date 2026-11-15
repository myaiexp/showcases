// l7 example: Quick start: time series with setData
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Quick start: time series with setData",
  summary: "The simplest way to animate data over time is to call setData with each day's table. Every tick hands the polygon layer a new set of values; the colour function stays the same.",
  section: "Getting Started",
  tags: ["setData","PolygonLayer","color","time series"],
  docs: ["repo/site/docs/tutorial/quickstart.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
