// leaflet example: Marker z-index and riseOnHover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker z-index and riseOnHover",
  summary: "Markers stack by latitude, so the southernmost is in front. A slider sets zIndexOffset on the back marker of the left stack with setZIndexOffset(); the right stack has riseOnHover, which lifts the hovered marker by riseOffset.",
  section: "Markers & icons",
  tags: ["Marker", "zIndexOffset", "setZIndexOffset", "riseOnHover", "riseOffset", "DefaultIcon"],
  docs: ["repo/src/layer/marker/Marker.js", "repo/src/layer/marker/DefaultIcon.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
