// One GitGraph history under the base, forest, default, dark and neutral themes (theme in frontmatter)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

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

// theme in the diagram's own frontmatter outranks the site default, which is dark on this page.
const themed = (theme: string): string => `---\nconfig:\n  theme: '${theme}'\n---\n${HISTORY}`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'base', code: themed('base') },
      { label: 'forest', code: themed('forest') },
      { label: 'default', code: themed('default') },
      { label: 'dark', code: themed('dark') },
      { label: 'neutral', code: themed('neutral') },
    ],
    interval: 2500,
  });

export default mount;
