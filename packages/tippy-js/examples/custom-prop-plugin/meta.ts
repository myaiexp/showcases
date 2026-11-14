// Tippy.js example: a plugin that adds a new autoHideAfter setting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add your own setting',
  summary:
    'Tippy has no "close by itself" setting, so a ten-line plugin adds one: autoHideAfter. Click Save and the "Saved" tip fades after the time you chose; with 0 it waits for a click.',
  section: 'Plugins',
  tags: ['plugins', 'name', 'defaultValue', 'fn', 'TypeScript', 'onShown', 'onHide'],
  docs: ['repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
