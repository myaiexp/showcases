// Markdown strings: backtick labels with **bold**, *italics* and automatic wrapping
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Node, edge and subgraph labels in "`...`" form. htmlLabels: false is what the docs use here.
const MARKDOWN = `---
config:
  htmlLabels: false
---
flowchart LR
subgraph "One"
  a("\`The **cat**
  in the hat\`") -- "edge label" --> b{{"\`The **dog** in the hog\`"}}
end
subgraph "\`**Two**\`"
  c("\`The **cat**
  in the hat\`") -- "\`Bold **edge label**\`" --> d("The dog in the hog")
end`;

// A long label wraps by itself; here italics and bold mix in one line.
const WRAPPING = `---
config:
  htmlLabels: false
---
flowchart TB
  a["\`Markdown strings wrap long text on their own, so there is *no need* for **br** tags\`"] --> b("\`Short *italic* note\`")`;

// markdownAutoWrap: false turns the wrapping off; the newline in the label still breaks the line.
const NO_WRAP = `---
config:
  htmlLabels: false
  markdownAutoWrap: false
---
flowchart TB
  a["\`Markdown strings wrap long text on their own, so there is *no need* for **br** tags\`"] --> b("\`Short *italic* note\`")`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Nodes, edges, subgraphs', code: MARKDOWN },
      { label: 'Auto wrapping', code: WRAPPING },
      { label: 'markdownAutoWrap: false', code: NO_WRAP },
    ],
  });

export default mount;
