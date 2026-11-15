// globe-gl example: Render: pointerEventsFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: pointerEventsFilter",
  summary:
    "Raised translucent countries cover the city columns, so the pointer normally hovers the country. pointerEventsFilter(obj, data) decides which objects can take pointer events: a filter that rejects the polygons layer lets hovers through to the cities underneath.",
  section: "Render Control",
  tags: ["pointerEventsFilter", "onPolygonHover", "onPointHover", "polygonLabel", "pointLabel"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
