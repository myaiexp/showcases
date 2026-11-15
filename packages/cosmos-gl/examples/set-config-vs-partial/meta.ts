// cosmos-gl example: setConfig vs setConfigPartial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setConfig vs setConfigPartial',
  summary:
    'setConfig resets every key you leave out to its default, so a second call with only a background color also drops the big points and curved links. setConfigPartial changes just the keys you pass, and a key set to undefined goes back to its default alone.',
  section: 'Configuration',
  tags: ['setConfig', 'setConfigPartial', 'backgroundColor'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
