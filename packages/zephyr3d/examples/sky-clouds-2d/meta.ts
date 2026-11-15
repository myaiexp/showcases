// zephyr3d example: 2D procedural clouds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "2D procedural clouds",
  summary:
    "On the scattering sky, cloudy sets cloud cover, cloudIntensity brightness and wind the drift speed and direction. These clouds are cheap and draw on every backend.",
  section: "Environment",
  tags: ['cloudy', 'cloudIntensity', 'wind', 'cloudMode', 'effectiveCloudMode', 'skyType'],
  docs: ['repo/apps/doc/web/en/sky.md', 'repo/apps/doc/src/tut-34/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
