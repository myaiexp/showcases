// l7 example: Scene on the built-in Map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene on the built-in Map',
  summary:
    "A Scene whose map is L7's own Map engine from @antv/l7-maps: no basemap, no tiles, no token. Drag to pan, scroll to zoom; the world outline is just another layer.",
  section: 'Tutorial: Map',
  tags: ['Scene', 'Map', 'logoVisible', 'PointLayer'],
  docs: ['repo/site/docs/api/map/map.en.md', 'repo/site/docs/tutorial/map/blankmap.en.md', 'repo/site/docs/api/scene.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
