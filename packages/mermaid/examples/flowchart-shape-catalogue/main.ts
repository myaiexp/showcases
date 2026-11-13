// Every expanded @{ shape: ... } name, grouped by role; each label is the shape's short name
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Process and terminal shapes: rect, rounded, stadium, fr-rect, framed and divided rectangles, hexagon, odd and decision.
const PROCESS = `flowchart LR
    a1@{ shape: rect, label: "rect" }
    a2@{ shape: rounded, label: "rounded" }
    a3@{ shape: stadium, label: "stadium" }
    a4@{ shape: fr-rect, label: "fr-rect" }
    a5@{ shape: diam, label: "diam" }
    a6@{ shape: hex, label: "hex" }
    a7@{ shape: odd, label: "odd" }
    a8@{ shape: div-rect, label: "div-rect" }
    a9@{ shape: lin-rect, label: "lin-rect" }
    a10@{ shape: st-rect, label: "st-rect" }
    a11@{ shape: tag-rect, label: "tag-rect" }
    a12@{ shape: notch-rect, label: "notch-rect" }
    a1 --> a2 --> a3 --> a4 --> a5
    a5 --> a6 --> a7
    a8 --> a9 --> a10 --> a11 --> a12`;

// Data and storage: cylinders, datastore, input/output slants and trapezoids.
const STORAGE = `flowchart LR
    b1@{ shape: cyl, label: "cyl" }
    b2@{ shape: h-cyl, label: "h-cyl" }
    b3@{ shape: lin-cyl, label: "lin-cyl" }
    b4@{ shape: datastore, label: "datastore" }
    b5@{ shape: win-pane, label: "win-pane" }
    b6@{ shape: bow-rect, label: "bow-rect" }
    b7@{ shape: lean-r, label: "lean-r" }
    b8@{ shape: lean-l, label: "lean-l" }
    b9@{ shape: trap-b, label: "trap-b" }
    b10@{ shape: trap-t, label: "trap-t" }
    b11@{ shape: sl-rect, label: "sl-rect" }
    b12@{ shape: curv-trap, label: "curv-trap" }
    b1 --> b2 --> b3 --> b4 --> b5 --> b6
    b7 --> b8 --> b9 --> b10 --> b11 --> b12`;

// Documents and paper: single, lined, tagged and stacked documents, tape and files.
const DOCUMENTS = `flowchart LR
    c1@{ shape: doc, label: "doc" }
    c2@{ shape: lin-doc, label: "lin-doc" }
    c3@{ shape: tag-doc, label: "tag-doc" }
    c4@{ shape: docs, label: "docs" }
    c5@{ shape: flag, label: "flag" }
    c6@{ shape: flip-tri, label: "flip-tri" }
    c7@{ shape: text, label: "text" }
    c8@{ shape: notch-pent, label: "notch-pent" }
    c1 --> c2 --> c3 --> c4
    c5 --> c6 --> c7 --> c8`;

// Connectors, flow-control marks and comments: circles, fork bar, hourglass and the three brace forms.
const CONNECTORS = `flowchart LR
    d1@{ shape: circle, label: "circle" }
    d2@{ shape: sm-circ, label: "sm-circ" }
    d3@{ shape: dbl-circ, label: "dbl-circ" }
    d4@{ shape: fr-circ, label: "fr-circ" }
    d5@{ shape: f-circ, label: "f-circ" }
    d6@{ shape: cross-circ, label: "cross-circ" }
    d7@{ shape: fork, label: "fork" }
    d8@{ shape: hourglass, label: "hourglass" }
    d9@{ shape: tri, label: "tri" }
    d10@{ shape: delay, label: "delay" }
    d11@{ shape: bolt, label: "bolt" }
    n1@{ shape: brace, label: "brace" }
    n2@{ shape: brace-r, label: "brace-r" }
    n3@{ shape: braces, label: "braces" }
    d1 --> d2 --> d3 --> d4 --> d5 --> d6
    d7 --> d8 --> d9 --> d10 --> d11
    d11 --- n1
    d11 --- n2
    d11 --- n3`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Process and terminal', code: PROCESS },
      { label: 'Data and storage', code: STORAGE },
      { label: 'Documents', code: DOCUMENTS },
      { label: 'Connectors and comments', code: CONNECTORS },
    ],
  });

export default mount;
