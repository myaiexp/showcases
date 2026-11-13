// mermaid example: configuration layers and which one wins
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/mermaid/src/docs';

export default defineMeta({
  title: 'Configuration layers and precedence',
  summary:
    'The same flowchart under each layer of configuration: the site config from initialize(), a frontmatter override, a key scoped to the flowchart type, and an edge-level curve that beats the diagram-level one.',
  section: 'Configuration',
  tags: ['configuration', 'siteConfig', 'frontmatter', 'themeVariables', 'curve', 'dagre'],
  docs: [
    `${DOCS}/config/configuration.md`,
    `${DOCS}/config/theming.md`,
    `${DOCS}/syntax/flowchart.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
