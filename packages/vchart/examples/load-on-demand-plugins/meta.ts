// vchart example: Load on demand: plugins, interactions, environment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Load on demand: plugins, interactions, environment",
  summary:
    "Plugins (formatter, media query), interactions (highlight, select) and the browser environment register the same way as charts. One bar chart uses the formatter and the media query while its width changes; registering is shown, not measured.",
  section: "Load on Demand",
  tags: ['registerFormatPlugin','registerMediaQuery','registerBrowserEnv','registerElementHighlight'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Load_on_Demand.md",
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Plugins/Formatter.md",
    "repo/docs/assets/guide/en/tutorial_docs/Self-adaption/Media_Query.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
