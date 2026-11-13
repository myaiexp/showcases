// The tidy-tree layout from @mermaid-js/layout-tidy-tree, registered once and picked per mindmap in frontmatter
import tidyTreeLayouts from '@mermaid-js/layout-tidy-tree';
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';

// tidy-tree is not in the mermaid bundle: the package's loaders are registered once per page,
// then any diagram can ask for it with `layout: tidy-tree` (tidy-tree.md, mindmap.md § Layouts).
let registered = false;
function ensureLayout(): void {
  if (registered) return;
  registered = true;
  mermaid.registerLayoutLoaders(tidyTreeLayouts);
}

const RESEARCH = `mindmap
root((mindmap))
    Origins
      Long history
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping`;

// The docs' smallest case: four children spread on both sides of the root.
const FLAT = `---
config:
  layout: tidy-tree
---
mindmap
root((mindmap is a long thing))
  A
  B
  C
  D`;

// A deeper tree: tidy-tree keeps each subtree compact and never lets branches overlap.
const TIDY = `---
config:
  layout: tidy-tree
---
${RESEARCH}`;

// The same tree with no layout key: mindmaps fall back to their own default, cose-bilkent.
const DEFAULT = RESEARCH;

const mount: Mount = (el, ctx) => {
  ensureLayout();
  return playground(el, ctx, {
    variants: [
      { label: 'tidy-tree, flat', code: FLAT },
      { label: 'tidy-tree, deep', code: TIDY },
      { label: 'Default (cose-bilkent)', code: DEFAULT },
    ],
  });
};

export default mount;
