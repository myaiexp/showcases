// galacean example: Device: lose and restore the GPU device
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Device: lose and restore the GPU device",
  summary:
    "engine.forceLoseDevice() and forceRestoreDevice() simulate the GPU taking the context away. The engine fires devicelost and devicerestored, rebuilds loaded resources itself, and a custom ContentRestorer brings back a texture that was drawn in code.",
  section: "Device",
  tags: ['Engine', 'forceLoseDevice', 'forceRestoreDevice', 'devicelost', 'devicerestored', 'ContentRestorer', 'addContentRestorer'],
  docs: [
    'repo/docs/en/device/restore.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
