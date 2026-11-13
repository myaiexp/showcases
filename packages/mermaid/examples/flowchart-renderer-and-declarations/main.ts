// Flowchart renderer: default ELK vs layout: dagre, the legacy flowchart-elk keyword, and relaxed declaration spacing
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// No layout key: ELK, the v12 default, lays the diagram out.
const DEFAULT = `flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]`;

// layout: dagre in frontmatter selects the classic Dagre layout instead.
const DAGRE = `---
config:
  layout: dagre
---
flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]`;

// flowchart-elk predates the layout key and picked what is now the default; it still parses.
const LEGACY = `flowchart-elk LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]`;

// Statements can end without a semicolon and a single space may sit between a vertex and
// its link; there must be no space between a vertex and its own text, or a link and its text.
const SPACING = `flowchart LR
    A[Hard edge] --> B(Round edge);
    B-->C{Decision}
    C --> D[Result one];
    C -->|Two| E[Result two]`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Default (ELK)', code: DEFAULT },
      { label: 'layout: dagre', code: DAGRE },
      { label: 'flowchart-elk keyword', code: LEGACY },
      { label: 'Relaxed declarations', code: SPACING },
    ],
  });

export default mount;
