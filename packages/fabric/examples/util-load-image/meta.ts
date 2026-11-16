// fabric example: Utilities: loadImage with success, failure and abort
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: loadImage with success, failure and abort',
  summary:
    'util.loadImage wraps image loading in a promise: a data: URL resolves with an <img>, a broken one rejects with an error, and an AbortSignal cancels a load in flight. The log shows what each call returned.',
  section: 'Utilities',
  tags: ['util.loadImage', 'AbortSignal', 'FabricImage'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/loadImage.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
