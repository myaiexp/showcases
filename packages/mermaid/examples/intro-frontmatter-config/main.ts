// Frontmatter between --- lines gives a diagram a title and per-diagram config; %% lines are comments
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A title plus a theme for this diagram only, with a %% line comment inside the definition.
const TITLED = `---
title: Release checklist
config:
  theme: forest
---
flowchart LR
  %% line comments start with %%
  Tag[Tag release] --> Build[Build] --> Publish[Publish]`;

// The look from syntax-reference's "Selecting Diagram Looks": handDrawn with the neutral theme.
const HAND_DRAWN = `---
title: Triage
config:
  look: handDrawn
  theme: neutral
---
flowchart LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Continue]
  B -->|No| D[Stop]`;

// Frontmatter is generic: the same block configures a gantt chart (title, displayMode, gantt options).
const GANTT = `---
title: Frontmatter Example
displayMode: compact
config:
  theme: forest
gantt:
    useWidth: 400
    compact: true
---
gantt
    section Waffle
        Iron  : 1982, 3y
        House : 1986, 3y`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Title + theme', code: TITLED },
      { label: 'Hand-drawn look', code: HAND_DRAWN },
      { label: 'Gantt options', code: GANTT },
    ],
  });

export default mount;
