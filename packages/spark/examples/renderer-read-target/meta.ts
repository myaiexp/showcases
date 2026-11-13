// Spark example: renderReadTarget pixels turned into a strip of PNG snapshots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'renderReadTarget snapshots',
  summary:
    'A SparkRenderer with a target renders the scene offline: update() sorts it for a snapshot camera, renderReadTarget() draws into the target and reads the RGBA pixels back, and flipPixels() plus pixelsToPngUrl() turn them into an img. The card takes a snapshot every 1.5 seconds; in the full view the Snapshot button does, and superXY renders at several times the size then averages down on readback for a smoother image.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'renderReadTarget', 'readTarget', 'superXY', 'pixelsToPngUrl', 'flipPixels'],
  docs: ['repo/docs/docs/spark-renderer.md', 'repo/docs/docs/new-spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
