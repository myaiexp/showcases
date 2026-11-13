// GitGraph mainBranchName, branch order: and mainBranchOrder in frontmatter
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// mainBranchName renames the root branch; here a metro map whose main line is MetroLine1.
const NAME = `---
config:
  gitGraph:
    showBranches: true
    showCommitLabel: true
    mainBranchName: 'MetroLine1'
---
gitGraph
  commit id:"NewYork"
  commit id:"Dallas"
  branch MetroLine2
  commit id:"LosAngeles"
  commit id:"Chicago"
  commit id:"Houston"
  branch MetroLine3
  commit id:"Phoenix"
  commit type: HIGHLIGHT id:"Denver"
  commit id:"Boston"
  checkout MetroLine1
  commit id:"Atlanta"
  merge MetroLine3
  commit id:"Miami"
  commit id:"Washington"
  merge MetroLine2 tag:"MY JUNCTION"
  commit id:"Boston"
  commit id:"Detroit"
  commit type:REVERSE id:"SanFrancisco"`;

// By default branches appear in the order they are declared.
const DECLARED = `gitGraph
  commit
  branch test1
  branch test2
  branch test3`;

// order: gives every branch a row, so test3 (1) comes first and test1 (3) last, whatever the declaration order.
const ORDERED = `gitGraph
  commit
  branch test1 order: 3
  branch test2 order: 2
  branch test3 order: 1`;

// Unordered branches come first in declaration order, then ordered ones by value. mainBranchOrder: 2
// moves main out of the first row: it lands after test4 (order 1) and before test1 (order 3).
const MAIN_ORDER = `---
config:
  gitGraph:
    showBranches: true
    showCommitLabel: true
    mainBranchOrder: 2
---
gitGraph
  commit
  branch test1 order: 3
  branch test2
  branch test3
  branch test4 order: 1`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'mainBranchName', code: NAME },
      { label: 'Declaration order', code: DECLARED },
      { label: 'order:', code: ORDERED },
      { label: 'mainBranchOrder', code: MAIN_ORDER },
    ],
  });

export default mount;
