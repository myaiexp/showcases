// Chained links, & fan-out/fan-in, edge IDs (id@ then id@{ curve }) and circle, cross and two-way arrow ends
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// One line can declare several links, each with its own text.
const CHAIN = `flowchart LR
   A -- text --> B -- text2 --> C -- more --> D`;

// & joins nodes into a group: a --> b & c--> d is four links; A & B--> C & D is also four.
const FAN = `flowchart TB
    a --> b & c --> d
    A & B --> C & D`;

// The same eight links as the two one-liners in the previous tab, written out one per line.
const LONG = `flowchart TB
    a --> b
    a --> c
    b --> d
    c --> d
    A --> C
    A --> D
    B --> C
    B --> D`;

// An id@ before the arrow names the edge; later statements address it like a node.
// Here e1 and e2 get different curves than the rest of the diagram.
const EDGE_IDS = `flowchart LR
    A e1@==> B
    A e2@--> C
    A e3@--> D
    e1@{ curve: linear }
    e2@{ curve: natural }
    e3@{ curve: stepAfter }`;

// Circle (--o) and cross (--x) ends, and multi-directional arrows on both sides.
const ENDS = `flowchart LR
    A --o B
    B --x C
    C o--o D
    D <--> E
    E x--x F`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Chained links', code: CHAIN },
      { label: 'Fan-out with &', code: FAN },
      { label: 'The long way', code: LONG },
      { label: 'Edge ids', code: EDGE_IDS },
      { label: 'Arrow ends', code: ENDS },
    ],
  });

export default mount;
