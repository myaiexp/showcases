// aframe example: Minecraft guide: a half-sphere sky with theta-length 90
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minecraft guide: a half-sphere sky with theta-length 90',
  summary:
    'The guide\'s sky texture covers a semi-sphere, so theta-length="90" chops the <a-sky> sphere in half and radius="30" matches it to the ground. A slider changes theta-length to show the part removed.',
  section: 'Guides',
  tags: ['a-sky', 'theta-length', 'radius', 'src'],
  docs: ['repo/docs/guides/building-a-minecraft-demo.md', 'repo/docs/primitives/a-sky.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
