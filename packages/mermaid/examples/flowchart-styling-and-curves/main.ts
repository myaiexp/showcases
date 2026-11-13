// Styling: style, classDef with :::, linkStyle and curve styles for all or one edge
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// style sets one node's look; the stroke-dasharray value uses a space, not a comma.
const NODE_STYLE = `flowchart LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px,color:#111
    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5`;

// classDef once, attach with ::: (also inside & lists); linkStyle colours link number 3 (counting from 0).
const CLASSES = `flowchart LR
    Source:::input & Cache:::input --> Merge:::core
    Merge --> Report:::output
    Report -.-> Source
    classDef input stroke:#0f0,color:#0f0
    classDef core fill:#f96,color:#111
    classDef output stroke:#00f,stroke-width:3px
    linkStyle 3 stroke:#ff3,stroke-width:4px,color:red;`;

// Diagram-wide curve in frontmatter: every edge uses stepBefore.
const STEP_CURVE = `---
config:
  flowchart:
    curve: stepBefore
---
flowchart LR
    A[Ingest] --> B[Parse]
    A --> C[Validate]
    B --> D[Store]
    C --> D`;

// Edge-level curve through an edge id (v11.10.0+); it overrides the diagram setting.
const EDGE_CURVE = `---
config:
  flowchart:
    curve: stepBefore
---
flowchart LR
    A e1@==> B
    A e2@--> C
    A e3@--> D
    e1@{ curve: linear }
    e2@{ curve: natural }`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'style', code: NODE_STYLE },
      { label: 'classDef and linkStyle', code: CLASSES },
      { label: 'Diagram curve', code: STEP_CURVE },
      { label: 'Edge curve', code: EDGE_CURVE },
    ],
  });

export default mount;
