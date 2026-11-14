// network-or-server-error example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tell a dead connection from a server error",
  summary:
    "Three ways sending a chat message can fail: the connection drops, the server refuses it, the server crashes. .fetchError(), .badRequest() and .internalError() tell them apart, so the app can say whether to retry, fix the message, or wait.",
  section: 'Recipes',
  tags: ['fetchError', 'badRequest', 'internalError', 'resolve'],
  docs: ['repo/RECIPES.md', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
