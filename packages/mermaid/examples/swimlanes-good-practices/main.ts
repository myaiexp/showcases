// Swimlanes: weaker and stronger versions of the same process, plus long-process splitting and accessibility
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Weak: lanes mix a team, a phase and a status, so "who owns this step?" has no answer.
const MIXED = `swimlane-beta LR
  subgraph Customer
    submit[Submit order]
  end
  subgraph Pending
    check[Check order]
  end
  subgraph Warehouse team
    pack[Pack items]
  end
  subgraph Done
    deliver[Deliver package]
  end
  submit --> check --> pack --> deliver`;

// Better: every lane is one owner, and the handoff arrows between lanes are where ownership changes.
const OWNERS = `swimlane-beta LR
  subgraph Customer
    submit[Submit order]
    confirm[Confirm delivery]
  end
  subgraph Store
    check[Check order]
    pack[Pack items]
  end
  subgraph Carrier
    collect[Collect package]
    deliver[Deliver package]
  end
  submit --> check --> pack --> collect --> deliver --> confirm`;

// The decision sits in Support, the lane that makes it; the outcomes route to the lanes that act.
const DECISION = `swimlane-beta LR
  subgraph Support
    classify{Can support solve it?}
    respond[Respond to customer]
  end
  subgraph Product
    prioritize[Prioritize fix]
  end
  subgraph Engineering
    implement[Implement fix]
  end
  classify -->|Yes| respond
  classify -->|No| prioritize --> implement --> respond`;

// Long processes: this is only the intake and review half; delivery lives in its own diagram.
const LONG_A = `swimlane-beta TB
  subgraph Intake
    collect[Collect request]
    validate[Validate details]
  end
  subgraph Review
    review[Review request]
    decide{Ready?}
  end
  collect --> validate --> review --> decide
  decide -->|No| collect
  decide -->|Yes| next[To delivery diagram]`;

// Stable ids (ops, legal, review) stay put while the labels in brackets change freely.
const IDS = `swimlane-beta LR
  subgraph ops [Operations]
    intake[Receive request]
    plan[Plan work]
  end
  subgraph legal [Legal]
    review[Review contract]
  end
  intake --> plan --> review

  classDef attention fill:#fff2cc,stroke:#d6a500,color:#111;
  class review attention;`;

// accTitle and accDescr give the SVG an accessible name and description.
const ACCESSIBLE = `swimlane-beta LR
  accTitle: Support escalation
  accDescr: A request starts with the customer, is triaged by support, and may be escalated to engineering.

  subgraph Customer
    request[Open request]
  end
  subgraph Support
    triage[Triage]
  end
  subgraph Engineering
    resolve[Resolve]
  end
  request --> triage --> resolve`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Mixed lanes (weak)', code: MIXED },
      { label: 'Ownership lanes', code: OWNERS },
      { label: 'Decision in its lane', code: DECISION },
      { label: 'Split long process', code: LONG_A },
      { label: 'Stable ids', code: IDS },
      { label: 'Accessibility', code: ACCESSIBLE },
    ],
  });

export default mount;
