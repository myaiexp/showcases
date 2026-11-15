// l7 example: Quick start: time series by re-mapping color
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Quick start: time series by re-mapping color",
  summary: "When only the attribute values change and the shapes stay put, point color() at a different field and render: the docs call this more efficient than setData because the geometry is not rebuilt. Each day is its own column.",
  section: "Getting Started",
  tags: ["color","render","time series","callback"],
  docs: ["repo/site/docs/tutorial/quickstart.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
