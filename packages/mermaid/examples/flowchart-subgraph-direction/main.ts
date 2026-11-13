// Subgraphs: edges to the box, a direction per subgraph, and when that direction is ignored
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Edges can point at a subgraph itself, not only at the nodes inside it.
const LINKED = `flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2`;

// direction inside a subgraph, nested; an explicit id (ide1) separates the id from the title.
const DIRECTION = `flowchart LR
  subgraph TOP
    direction TB
    subgraph B1
        direction RL
        i1 -->f1
    end
    subgraph B2
        direction BT
        i2 -->f2
    end
  end
  A --> TOP --> B
  B1 --> B2`;

// The limitation: subgraph1 keeps TB, subgraph2 has a node linked from outside and inherits LR.
const LIMITATION = `flowchart LR
    subgraph subgraph1
        direction TB
        top1[top] --> bottom1[bottom]
    end
    subgraph subgraph2
        direction TB
        top2[top] --> bottom2[bottom]
    end
    %% Link to subgraph1: its direction is kept
    outside --> subgraph1
    %% Link to a node inside subgraph2: it inherits LR
    outside ---> top2`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Edges between subgraphs', code: LINKED },
      { label: 'Direction per subgraph', code: DIRECTION },
      { label: 'Direction ignored', code: LIMITATION },
    ],
  });

export default mount;
