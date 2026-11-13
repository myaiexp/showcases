// GitGraph cherry-pick: a plain commit, then a merge commit with the required parent: attribute
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// cherry-pick id: "B" adds a commit on the current branch marked with a cherry and a tag
// naming the source commit. The commit must exist on another branch and the current branch
// needs at least one commit already.
const SIMPLE = `gitGraph
    commit id: "A"
    branch feature
    commit id: "FIX"
    checkout main
    commit id: "B"
    cherry-pick id: "FIX"
    commit id: "C"`;

// Several cherry-picks onto a release branch, each from a different branch.
const RELEASE = `gitGraph
    commit id: "base"
    branch dev
    branch hotfix
    checkout dev
    commit id: "feat-1"
    commit id: "feat-2"
    checkout hotfix
    commit id: "sec-fix"
    checkout main
    branch release
    commit id: "rc-1"
    cherry-pick id: "sec-fix"
    cherry-pick id: "feat-1"
    commit id: "rc-2" tag: "v1.0"`;

// Cherry-picking a merge commit needs parent: with the id of one of the merge commit's immediate parents.
const MERGE = `gitGraph
    commit id: "ZERO"
    branch develop
    branch release
    commit id:"A"
    checkout main
    commit id:"ONE"
    checkout develop
    commit id:"B"
    checkout main
    merge develop id:"MERGE"
    commit id:"TWO"
    checkout release
    cherry-pick id:"MERGE" parent:"B"
    commit id:"THREE"
    checkout develop
    commit id:"C"`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'One cherry-pick', code: SIMPLE },
      { label: 'Onto a release branch', code: RELEASE },
      { label: 'Merge commit with parent', code: MERGE },
    ],
  });

export default mount;
