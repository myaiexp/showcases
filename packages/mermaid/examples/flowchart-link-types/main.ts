// Links: open, dotted, thick, circle/cross ends, both-way arrows, text and longer links
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Four line styles side by side, with text on links in the |text| and -- text -- forms.
const STYLES = `flowchart LR
    A[Client] -->|request| B[Server]
    B -- open link --- C[Cache]
    B -. async .-> D[Queue]
    B == priority ==> E[Worker]
    E ~~~ D`;

// Circle and cross ends, plus arrows with a head on both sides.
const ENDS = `flowchart LR
    A --o B
    B --x C
    C o--o D
    D <--> E
    E x--x F`;

// Chaining and the & operator; "B ---->" stretches the No link across extra ranks.
const CHAINS = `flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]`;

// One line fans out with &: four edges from two sources to two targets.
const FAN = `flowchart TB
    Web & Mobile --> Gateway & Metrics
    Gateway -- ok --> Billing`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Line styles', code: STYLES },
      { label: 'Arrow ends', code: ENDS },
      { label: 'Longer link', code: CHAINS },
      { label: 'Fan with &', code: FAN },
    ],
  });

export default mount;
