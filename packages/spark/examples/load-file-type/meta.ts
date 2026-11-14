// Spark example: fileType and fileName when the URL has no extension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Telling Spark the file type',
  summary:
    'The same extension-less blob: URL is loaded with no hint, with a fileName, with fileType set to SplatFileType.PLY and with a deliberately wrong SPLAT type, and the label reports which decoded and which failed. PLY and SPZ are sniffed from their bytes, while .splat and .ksplat can only be recognised from an extension or an explicit fileType.',
  section: 'Loading Splats',
  tags: ['fileType', 'fileName', 'SplatFileType', 'SplatMesh', 'url'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/packed-splats.md', 'repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
