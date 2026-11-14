// g6 example: Custom plugin: load data on construction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom plugin: load data on construction',
  summary: 'A plugin class extending BasePlugin loads its own data and renders in its constructor, so the Graph is created without any data option.',
  section: 'Plugin',
  tags: ['BasePlugin', 'register', 'ExtensionCategory.PLUGIN', 'setData'],
  docs: ['repo/packages/site/docs/manual/plugin/custom-plugin.en.md', 'repo/packages/site/common/manual/custom-extension/plugin/implement-plugin.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
