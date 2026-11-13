// Wardley maps: canvas size, label offsets, naming and custom stage axes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// [visibility, evolution]: first number is height, second is left-to-right, opposite of (x, y).
const COORDS = `wardley-beta
title Coordinate order

component Infrastructure [0.30, 0.20]
component Product [0.70, 0.60]
component User Need [0.90, 0.95]`;

// size [w, h] sets the canvas in pixels; this one is narrow and tall.
const SIZE = `wardley-beta
title Tall canvas
size [600, 700]

component Front end [0.85, 0.80]
component Service [0.55, 0.55]
component Storage [0.20, 0.75]

Front end -> Service
Service -> Storage`;

// label [dx, dy] nudges the text: negative x moves left, negative y moves up.
const LABELS = `wardley-beta
title Label positioning

component Crowded A [0.60, 0.50] label [-70, -14]
component Crowded B [0.60, 0.56] label [12, 18]
component Crowded C [0.54, 0.53] label [14, 4]

Crowded A -> Crowded C
Crowded B -> Crowded C`;

// Hyphens are fine unquoted; quote a name that starts with a digit or holds other characters.
const NAMES = `wardley-beta
title Names

component real-time processing [0.55, 0.40]
component end-user [0.90, 0.95]
component "3D Printer (shared)" [0.30, 0.30]
component "Custom Service" [0.70, 0.60]

end-user -> "Custom Service"
"Custom Service" -> real-time processing
real-time processing -> "3D Printer (shared)"`;

// A dual label stage reads "Top / Bottom": two lines on the axis.
const DUAL = `wardley-beta
title Dual stage labels

evolution Genesis / Concept -> Custom / Emerging -> Product / Converging -> Commodity / Accepted

component Novel Idea [0.05, 0.20]
component Custom Solution [0.35, 0.50]
component Product [0.65, 0.70]
component Utility [0.95, 0.90]`;

// @ gives each stage its right boundary: here the first two stages are narrow.
const WIDTHS = `wardley-beta
title Stage widths

evolution Idea@0.15 -> Prototype@0.3 -> Product@0.7 -> Utility@1.0

component Spark [0.80, 0.10]
component Demo [0.65, 0.25]
component Release [0.50, 0.55]
component Standard [0.35, 0.90]`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Coordinate order', code: COORDS },
      { label: 'Canvas size', code: SIZE },
      { label: 'Label offsets', code: LABELS },
      { label: 'Names', code: NAMES },
      { label: 'Dual labels', code: DUAL },
      { label: 'Stage widths', code: WIDTHS },
    ],
  });

export default mount;
