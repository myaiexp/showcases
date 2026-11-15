// globe-gl example: Points: lat, lng, color, altitude, radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Points: lat, lng, color, altitude, radius',
  summary:
    'One cylinder per city. pointLat and pointLng are given as attribute names, pointColor, pointAltitude and pointRadius as functions of the datum (population sets height and width, hemisphere sets colour), and pointResolution as a constant.',
  section: 'Points Layer',
  tags: ['pointsData', 'pointLat', 'pointLng', 'pointColor', 'pointAltitude', 'pointRadius', 'pointResolution', 'pointLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
