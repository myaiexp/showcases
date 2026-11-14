// Papa Parse example: downloadTimeout gives up on a slow download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Give up on a slow download',
  summary:
    'A server that never answers would leave your page waiting for ever. downloadTimeout is how many milliseconds Papa waits; past that it gives up and calls your error callback instead of complete. The server here is a stand-in whose speed you can change.',
  section: 'Parse config',
  tags: ['download', 'downloadTimeout', 'error', 'complete'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
