// GitGraph display options in frontmatter: showBranches, showCommitLabel and rotateCommitLabel
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A branchy history reused by the first three tabs.
const HISTORY = `gitGraph
  commit
  branch hotfix
  checkout hotfix
  commit
  branch develop
  checkout develop
  commit id:"ash" tag:"abc"
  branch featureB
  checkout featureB
  commit type:HIGHLIGHT
  checkout main
  checkout hotfix
  commit type:NORMAL
  checkout develop
  commit type:REVERSE
  checkout featureB
  commit
  checkout main
  merge hotfix
  checkout featureB
  commit
  checkout develop
  branch featureA
  commit
  checkout develop
  merge hotfix
  checkout featureA
  commit
  checkout featureB
  commit
  checkout develop
  merge featureA
  branch release
  checkout release
  commit
  checkout main
  commit
  checkout release
  merge main
  checkout develop
  merge release`;

const withConfig = (config: string, body: string): string =>
  `---\nconfig:\n  gitGraph:\n${config}\n---\n${body}`;

// Both on (the defaults), for comparison.
const SHOWN = withConfig('    showBranches: true\n    showCommitLabel: true', HISTORY);

// showBranches: false removes the branch names and the lines they sit on.
const NO_BRANCHES = withConfig('    showBranches: false', HISTORY);

// With showCommitLabel: false as well, only the commit shapes, tags and merge lines remain.
const NO_LABELS = withConfig('    showBranches: false\n    showCommitLabel: false', HISTORY);

// Long labels for the two label layouts.
const LABELS = `gitGraph
  commit id: "feat(api): ..."
  commit id: "a"
  commit id: "b"
  commit id: "fix(client): .extra long label.."
  branch c2
  commit id: "feat(modules): ..."
  commit id: "test(client): ..."
  checkout main
  commit id: "fix(api): ..."
  commit id: "ci: ..."
  branch b1
  commit
  branch b2
  commit`;

// rotateCommitLabel: true (the default) tilts labels 45 degrees, which suits long ones.
const ROTATED = withConfig('    rotateCommitLabel: true', LABELS);

// rotateCommitLabel: false centres them horizontally under each commit, which suits short ones.
const HORIZONTAL = withConfig('    rotateCommitLabel: false', LABELS);

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Branches and labels', code: SHOWN },
      { label: 'showBranches: false', code: NO_BRANCHES },
      { label: 'And showCommitLabel: false', code: NO_LABELS },
      { label: 'Rotated labels', code: ROTATED },
      { label: 'Horizontal labels', code: HORIZONTAL },
    ],
  });

export default mount;
