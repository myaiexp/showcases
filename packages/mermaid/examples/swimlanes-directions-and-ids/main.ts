// Swimlanes with lane ids, a flow direction, node shapes and a classDef highlight
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Lane ids (sales, finance) separate from the display labels in brackets.
const LANE_IDS = `swimlane-beta LR
  subgraph sales [Sales team]
    lead[Qualify lead]
    quote[Prepare quote]
  end

  subgraph finance [Finance team]
    review[Review terms]
    approve[Approve quote]
  end

  lead --> quote --> review --> approve`;

// Shapes: stadium start, rectangles, a decision and a circle end; a rework loop.
const SHAPES = `swimlane-beta LR
  subgraph Intake
    start([Start])
    task[Do work]
    fix[Fix issues]
  end

  subgraph Review
    decision{Ready?}
  end

  subgraph Complete
    done((Done))
  end

  start --> task --> decision
  decision -->|Yes| done
  decision -->|No| fix
  fix --> task`;

// A classDef flags the step that needs attention; dotted and thick arrows work like in flowcharts.
const CLASSES = `swimlane-beta TB
  subgraph ops [Operations]
    intake[Receive request]
    plan[Plan work]
  end

  subgraph legal [Legal]
    review[Review contract]
  end

  intake ==> plan -.-> review

  classDef attention fill:#fff2cc,stroke:#d6a500,color:#111;
  class review attention;`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Lane ids', code: LANE_IDS },
      { label: 'Shapes and rework', code: SHAPES },
      { label: 'classDef', code: CLASSES },
    ],
  });

export default mount;
