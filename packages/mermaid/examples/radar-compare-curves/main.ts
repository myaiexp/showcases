// Radar charts comparing curves across axes, with graticule, scale and theme options
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Curve values follow the order the axes were declared in; max/min fix the scale.
const GRADES = `radar-beta
  title Grades
  axis m["Math"], s["Science"], e["English"]
  axis h["History"], g["Geography"], a["Art"]
  curve a["Alice"]{85, 90, 80, 70, 75, 90}
  curve b["Bob"]{70, 75, 85, 80, 90, 85}

  max 100
  min 0`;

// graticule polygon replaces the circles; four restaurants share four axes.
const RESTAURANTS = `radar-beta
  title Restaurant Comparison
  axis food["Food Quality"], service["Service"], price["Price"]
  axis ambiance["Ambiance"]

  curve a["Restaurant A"]{4, 3, 2, 4}
  curve b["Restaurant B"]{3, 4, 3, 3}
  curve c["Restaurant C"]{2, 3, 4, 2}
  curve d["Restaurant D"]{2, 2, 4, 3}

  graticule polygon
  max 5`;

// Key-value curves name the axis for each value, in any order; ticks sets the ring count.
const KEY_VALUE = `radar-beta
  title Build profile
  axis speed["Speed"], size["Size"], safety["Safety"], dx["DX"], docs["Docs"]
  curve old["Old toolchain"]{ docs: 40, dx: 35, safety: 60, size: 50, speed: 30 }
  curve new["New toolchain"]{ speed: 90, size: 70, safety: 75, dx: 85, docs: 55 }
  ticks 4
  max 100
  showLegend true`;

// Theme: base with a custom colour scale and curve options from themeVariables.
const THEMED = `---
config:
  radar:
    axisScaleFactor: 0.25
    curveTension: 0.1
  theme: base
  themeVariables:
    cScale0: "#FF0000"
    cScale1: "#00FF00"
    cScale2: "#0000FF"
    radar:
      curveOpacity: 0
---
radar-beta
  axis A, B, C, D, E
  curve c1{1,2,3,4,5}
  curve c2{5,4,3,2,1}
  curve c3{3,3,3,3,3}`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Grades', code: GRADES },
      { label: 'Polygon graticule', code: RESTAURANTS },
      { label: 'Key-value curves', code: KEY_VALUE },
      { label: 'Themed colours', code: THEMED },
    ],
  });

export default mount;
