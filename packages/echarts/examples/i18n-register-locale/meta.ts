// echarts example: Locale packs with registerLocale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Locale packs with registerLocale',
  summary:
    'Since 5 the language is separate from the library: import a locale object, register it, and pass its name as the locale init option. Pick one of the languages added over the 5.x releases and the time axis month names and the legend selector buttons switch language.',
  section: "What's New in 5",
  tags: ['registerLocale', 'init opts.locale', 'time axis', 'legend.selector', 'langDE', 'langNL', 'langUK', 'langSV', 'langFA'],
  docs: [
    'repo/contents/en/basics/release-note/v5-feature.md',
    'repo/contents/en/basics/release-note/5-4-0.md',
    'repo/contents/en/basics/release-note/5-5-0.md',
    'repo/contents/en/basics/release-note/5-6-0.md',
    'repo/en/api/echarts.md',
    'repo/en/option/component/legend.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
