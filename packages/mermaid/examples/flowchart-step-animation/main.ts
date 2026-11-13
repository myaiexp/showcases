// Edges numbered with `step` play in order: a dot travels each one when its step comes up
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A request through a cache: each edge gets an id (e1@-->) and then a step number.
const CACHE_MISS = `flowchart LR
  Client e1@--> API
  API e2@--> Cache
  Cache e3@-->|miss| DB
  DB e4@--> API
  API e5@--> Client
  e1@{ step: 1 }
  e2@{ step: 2 }
  e3@{ step: 3 }
  e4@{ step: 4 }
  e5@{ step: 5 }`;

// Edges sharing a step number play together; stepNumbers draws each edge's step in a badge
// and stepDuration sets the seconds per step.
const FAN_OUT = `---
config:
  flowchart:
    stepDuration: 0.6
    stepNumbers: true
---
flowchart LR
  Order e1@--> Pay
  Pay e2@--> Stock
  Pay e3@--> Mail
  Pay e4@--> Ledger
  Stock e5@--> Ship
  e1@{ step: 1 }
  e2@{ step: 2 }
  e3@{ step: 2 }
  e4@{ step: 2 }
  e5@{ step: 3 }`;

// step combines with the dash animation from animate / animation.
const WITH_DASHES = `flowchart TB
  Build e1@==> Test
  Test e2@==> Deploy
  Deploy e3@-.->|rollback| Build
  e1@{ step: 1, animation: slow }
  e2@{ step: 2, animation: slow }
  e3@{ step: 3, animate: true }`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Cache miss', code: CACHE_MISS },
      { label: 'Shared steps + badges', code: FAN_OUT },
      { label: 'With dash animation', code: WITH_DASHES },
    ],
    interval: 6000,
  });

export default mount;
