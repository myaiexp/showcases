// tanstack-charts example: Same input, same markup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Same input, same markup",
  summary:
    "Hydration needs the server and the first browser render to agree. Here a definition is compiled twice and the two SVG strings are hashed. A definition built only from its inputs hashes the same both times; one that reads Math.random() while building does not, which would mismatch on hydration. The checkbox adds the random read.",
  section: "SSR and Hydration",
  tags: ['renderChartSvg', 'createChartScene', 'deterministic output', 'hash'],
  docs: ['repo/docs/guides/ssr-and-hydration.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
