// GitGraph themeVariables in frontmatter: branch, branch label, commit, tag and highlight colours and font sizes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const HISTORY = `gitGraph
   commit
   branch develop
   commit tag:"v1.0.0"
   commit
   checkout main
   commit type: HIGHLIGHT
   commit
   merge develop
   commit
   branch featureA
   commit`;

// Variables sit under themeVariables next to theme: 'default', whose defaults they override.
const themed = (vars: string): string =>
  `---\nconfig:\n  theme: 'default'\n  themeVariables:\n${vars}\n---\n${HISTORY}`;

// git0 to git7 colour up to eight branches in order (the first is main).
const BRANCH_COLOURS = themed(`    'git0': '#ff0000'
    'git1': '#00ff00'
    'git2': '#0000ff'
    'git3': '#ff00ff'
    'git4': '#00ffff'
    'git5': '#ffff00'
    'git6': '#ff00ff'
    'git7': '#00ffff'`);

// gitBranchLabel0 to 7 colour the branch name text; with ten branches the ninth and tenth reuse
// the colours of branches one and two, because the variables repeat cyclically.
const BRANCH_LABELS = `---
config:
  theme: 'default'
  themeVariables:
    'gitBranchLabel0': '#ffffff'
    'gitBranchLabel1': '#ffffff'
    'gitBranchLabel2': '#ffffff'
    'gitBranchLabel3': '#ffffff'
    'gitBranchLabel4': '#ffffff'
    'gitBranchLabel5': '#ffffff'
    'gitBranchLabel6': '#ffffff'
    'gitBranchLabel7': '#ffffff'
---
gitGraph
  checkout main
  branch branch1
  branch branch2
  branch branch3
  branch branch4
  branch branch5
  branch branch6
  branch branch7
  branch branch8
  branch branch9
  checkout branch1
  commit`;

// commitLabelColor and commitLabelBackground restyle the commit id labels.
const COMMIT_COLOURS = themed(`    commitLabelColor: '#ff0000'
    commitLabelBackground: '#00ff00'`);

// commitLabelFontSize changes the size of commit labels.
const COMMIT_FONT = themed(`    commitLabelColor: '#ff0000'
    commitLabelBackground: '#00ff00'
    commitLabelFontSize: '16px'`);

// tagLabelFontSize does the same for tag labels.
const TAG_FONT = themed(`    commitLabelColor: '#ff0000'
    commitLabelBackground: '#00ff00'
    tagLabelFontSize: '16px'`);

// tagLabelColor, tagLabelBackground and tagLabelBorder colour the tags.
const TAG_COLOURS = themed(`    tagLabelColor: '#ff0000'
    tagLabelBackground: '#00ff00'
    tagLabelBorder: '#0000ff'`);

// gitInv0 to gitInv7 colour the highlight commits of each branch; gitInv0 drives the main branch's.
const HIGHLIGHT = themed(`    'gitInv0': '#ff0000'`);

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Branch colours', code: BRANCH_COLOURS },
      { label: 'Branch labels', code: BRANCH_LABELS },
      { label: 'Commit colours', code: COMMIT_COLOURS },
      { label: 'Commit font size', code: COMMIT_FONT },
      { label: 'Tag font size', code: TAG_FONT },
      { label: 'Tag colours', code: TAG_COLOURS },
      { label: 'Highlight commits', code: HIGHLIGHT },
    ],
    interval: 2500,
  });

export default mount;
