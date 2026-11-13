// Image shape: A@{ img, label, pos, w, h, constraint } with SVGs passed as base64 data: URIs
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// img takes a URL; a data: URI is a URL, so the pictures live in the definition itself.
const uri = (svg: string): string => `data:image/svg+xml;base64,${btoa(svg)}`;

// A wide 120x60 picture (sun over hills) and a square 64x64 one (a badge), to show how w, h and constraint treat the aspect ratio.
const WIDE = uri(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60"><rect width="120" height="60" fill="#0ea5e9"/><circle cx="90" cy="18" r="10" fill="#fde047"/><path d="M0 60 30 25 55 48 80 30 120 60z" fill="#16a34a"/></svg>',
);
const BADGE = uri(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#8b5cf6"/><path d="m32 14 5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z" fill="#fef3c7"/></svg>',
);

// Image with a label: the label sits under the picture unless pos says otherwise.
const BASIC = `flowchart LR
    a@{ img: "${BADGE}", label: "Badge" }
    b@{ img: "${WIDE}", label: "Landscape" }
    a --> b`;

// pos: "t" puts the label above the image, "b" (default) below it.
const POS = `flowchart TD
    a@{ img: "${BADGE}", label: "Label on top", pos: "t", w: 64, h: 64 }
    b@{ img: "${BADGE}", label: "Label below", pos: "b", w: 64, h: 64 }
    a --> b`;

// w and h resize the picture; here the wide image is squeezed into 60x60 and then stretched to 160x40.
const SIZE = `flowchart LR
    a@{ img: "${WIDE}", label: "natural size" }
    b@{ img: "${WIDE}", label: "w: 60, h: 60", w: 60, h: 60 }
    c@{ img: "${WIDE}", label: "w: 160, h: 40", w: 160, h: 40 }
    a --> b --> c`;

// constraint: "on" keeps the aspect ratio: set h and the width follows.
const CONSTRAINT = `flowchart LR
    a@{ img: "${WIDE}", label: "h: 40, constraint off", h: 40, constraint: "off" }
    b@{ img: "${WIDE}", label: "h: 40, constraint on", h: 40, constraint: "on" }
    c@{ img: "${WIDE}", label: "h: 90, constraint on", h: 90, constraint: "on" }
    a --> b --> c`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Image and label', code: BASIC },
      { label: 'pos', code: POS },
      { label: 'w and h', code: SIZE },
      { label: 'constraint', code: CONSTRAINT },
    ],
  });

export default mount;
