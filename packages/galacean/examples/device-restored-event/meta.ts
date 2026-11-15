// galacean example: Device: rewrite content on devicerestored
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Device: rewrite content on devicerestored",
  summary:
    "A texture painted by hand (setPixelBuffer) loses its pixels with the device. The devicerestored handler writes them again; the readout counts losses and restores.",
  section: "Device",
  tags: ['Engine', 'devicelost', 'devicerestored', 'Texture2D', 'setPixelBuffer', 'forceLoseDevice'],
  docs: [
    'repo/docs/en/device/restore.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
