// Mindmap colorBy: one color per branch (default) or one color per hierarchy level
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// The default: each top-level branch has its own color and its descendants inherit it.
const BY_BRANCH = `---
config:
  mindmap:
    colorBy: branch
---
mindmap
  root((mindmap))
    origins{{Origins}}
      history[Long history]
        Popularisation
        British popular psychology author Tony Buzan
    research{{Research}}
      uses[Uses]
        Creative techniques`;

// colorBy: depth gives every node at the same level the same color, across all branches.
const BY_DEPTH = `---
config:
  mindmap:
    colorBy: depth
---
mindmap
  root((mindmap))
    origins{{Origins}}
      history[Long history]
        Popularisation
        British popular psychology author Tony Buzan
    research{{Research}}
      uses[Uses]
        Creative techniques`;

// Depth colors chosen by hand: base theme, cScale1..3 for backgrounds, cScaleLabel for text.
const CUSTOM_LEVELS = `---
config:
  theme: base
  mindmap:
    colorBy: depth
  themeVariables:
    git0: '#374151'
    gitBranchLabel0: '#ffffff'
    cScaleLabel0: '#ffffff'
    cScale1: '#bfdbfe'
    cScaleLabel1: '#172554'
    cScale2: '#bbf7d0'
    cScaleLabel2: '#14532d'
    cScale3: '#fde68a'
    cScaleLabel3: '#451a03'
---
mindmap
  root((mindmap))
    origins{{Origins}}
      history[Long history]
        Popularisation
        British popular psychology author Tony Buzan
    research{{Research}}
      uses[Uses]
        Creative techniques`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'By branch (default)', code: BY_BRANCH },
      { label: 'By depth', code: BY_DEPTH },
      { label: 'Custom level colors', code: CUSTOM_LEVELS },
    ],
    interval: 3000,
  });

export default mount;
