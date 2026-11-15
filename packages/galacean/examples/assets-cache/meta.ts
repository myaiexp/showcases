// galacean example: Assets: load, cache and getFromCache
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: load, cache and getFromCache",
  summary:
    "Loaded assets are cached by URL: loading the same URL twice returns the same object, getFromCache returns it synchronously once it is there, and a URL never loaded gives nothing back.",
  section: "Assets",
  tags: ['ResourceManager', 'load', 'getFromCache'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
