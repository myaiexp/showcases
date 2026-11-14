// echarts example: Geo roam modes and scaleLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo roam modes and scaleLimit',
  summary:
    'Mouse roaming on a geo component: roam as true, zoom only or pan only, a scaleLimit range the zoom cannot leave, and roamTrigger deciding whether dragging works only on the map or anywhere on the canvas. The georoam event feeds the live zoom ratio; Reset view restores center and zoom.',
  section: 'Option: Components',
  tags: ['geo', 'roam', 'scaleLimit', 'roamTrigger', 'georoam', 'totalZoom', 'center', 'zoom'],
  docs: [
    'repo/en/option/partial/roam.md',
    'repo/en/option/partial/view-coord-sys.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/geo.md',
    'repo/en/api/events.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
