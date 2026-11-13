// Quadrant charts with points styled directly, through classDef classes, and by theme variables
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Direct styles win over class styles, which win over theme styles.
const DIRECT_AND_CLASS = `quadrantChart
  title Reach and engagement of campaigns
  x-axis Low Reach --> High Reach
  y-axis Low Engagement --> High Engagement
  quadrant-1 We should expand
  quadrant-2 Need to promote
  quadrant-3 Re-evaluate
  quadrant-4 May be improved
  Campaign A: [0.9, 0.0] radius: 12
  Campaign B:::class1: [0.8, 0.1] color: #ff3300, radius: 10
  Campaign C: [0.7, 0.2] radius: 25, color: #00ff33, stroke-color: #10f0f0
  Campaign D: [0.6, 0.3] radius: 15, stroke-color: #00ff0f, stroke-width: 5px ,color: #ff33f0
  Campaign E:::class2: [0.5, 0.4]
  Campaign F:::class3: [0.4, 0.5] color: #0000ff
  classDef class1 color: #109060
  classDef class2 color: #908342, radius : 10, stroke-color: #310085, stroke-width: 10px
  classDef class3 color: #f00fff, radius : 10`;

// One shared class per status keeps a realistic backlog consistent.
const BACKLOG = `quadrantChart
  title Feature backlog
  x-axis Low effort --> High effort
  y-axis Low value --> High value
  quadrant-1 Plan carefully
  quadrant-2 Do first
  quadrant-3 Maybe later
  quadrant-4 Avoid
  Dark mode:::shipped: [0.2, 0.7]
  Search:::building: [0.45, 0.85]
  Offline sync:::planned: [0.85, 0.75]
  Emoji picker:::planned: [0.25, 0.2]
  Rewrite editor:::planned: [0.9, 0.3]
  classDef shipped color: #4caf50, radius: 8
  classDef building color: #ffb300, radius: 8
  classDef planned color: #90a4ae, radius: 6`;

// Chart size from config and quadrant colours from theme variables (no points: labels centre).
const THEMED = `---
config:
  quadrantChart:
    chartWidth: 400
    chartHeight: 400
  themeVariables:
    quadrant1TextFill: "ff0000"
---
quadrantChart
  x-axis Urgent --> Not Urgent
  y-axis Not Important --> "Important ❤"
  quadrant-1 Plan
  quadrant-2 Do
  quadrant-3 Delegate
  quadrant-4 Delete`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Backlog with classes', code: BACKLOG },
      { label: 'Direct and class styles', code: DIRECT_AND_CLASS },
      { label: 'Config and theme', code: THEMED },
    ],
  });

export default mount;
