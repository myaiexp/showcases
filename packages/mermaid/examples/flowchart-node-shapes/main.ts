// Node shapes: bracket shorthands and the v11.3 `@{ shape: ... }` syntax
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Bracket shorthands: ( ) round, ([ ]) stadium, [[ ]] subroutine, [( )] cylinder, { } rhombus, {{ }} hexagon.
const CLASSIC = `flowchart TD
    Start([Order placed]) --> Check{In stock?}
    Check -->|yes| Pack[[Pack items]]
    Check -->|no| Wait(Back-order)
    Pack --> Save[(Orders DB)]
    Wait --> Prep{{Prepare shipment}}
    Save --> Prep`;

// Parallelogram and trapezoid forms.
const SLANTED = `flowchart LR
    In[/Read input/] --> Out[\\Write output\\]
    Out --> Up[/Christmas\\]
    Up --> Down[\\Go shopping/]
    Down --> Done(((Finished)))`;

// The general syntax: A@{ shape: <short name>, label: "..." }, here a flow of document-ish shapes.
const EXPANDED = `flowchart LR
    A@{ shape: manual-input, label: "User Input" }
    B@{ shape: procs, label: "Process Automation" }
    C@{ shape: docs, label: "Multiple Documents" }
    D@{ shape: lin-cyl, label: "Disk storage" }
    E@{ shape: dbl-circ, label: "Stop" }
    A --> B --> C --> D --> E`;

// A grid of flowchart-symbol shapes, one node each.
const SYMBOLS = `flowchart TD
    A@{ shape: sm-circ, label: "Small start" }
    B@{ shape: notch-rect, label: "Card" }
    C@{ shape: delay, label: "Delay" }
    D@{ shape: hourglass, label: "Collate" }
    E@{ shape: bolt, label: "Communication link" }
    F@{ shape: tag-rect, label: "Tagged process" }
    G@{ shape: framed-circle, label: "Stop" }
    A --> B --> C --> D
    D --> E & F
    E --> G
    F --> G`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Bracket shapes', code: CLASSIC },
      { label: 'Slanted shapes', code: SLANTED },
      { label: '@{ shape } documents', code: EXPANDED },
      { label: '@{ shape } symbols', code: SYMBOLS },
    ],
  });

export default mount;
