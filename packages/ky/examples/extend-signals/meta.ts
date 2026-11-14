// ky example: extend combines signals, replaceOption or undefined drops them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cancel signals combine when you extend',
  summary:
    'A client can carry an abort signal that cancels all its requests, such as "the page was closed". A client extended with another signal keeps both, so either one cancels. To swap the inherited signal, wrap the new one in replaceOption; to drop it, pass signal: undefined. Fire each signal and see which requests stop.',
  section: 'Instances',
  tags: ['AbortSignal', 'ky.extend', 'replaceOption', 'signal'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
