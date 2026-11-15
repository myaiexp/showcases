// zephyr3d example: Pointer coordinates with drawText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer coordinates with drawText',
  summary:
    'The canvas forwards pointer events through the Application: a pointermove handler stores the coordinates and the tick handler draws them with device.setFont and device.drawText, once per frame.',
  section: 'Getting Started',
  tags: ['pointermove', 'Application.on', 'drawText', 'setFont', 'tick'],
  docs: ['repo/apps/doc/web/en/scene-basic.md', 'repo/apps/doc/src/tut-1/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
