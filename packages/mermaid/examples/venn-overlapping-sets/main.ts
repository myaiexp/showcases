// Venn diagrams of sets, unions, sizes, text nodes and styles
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Three sets and their overlaps; a three-way union labels the centre.
const FEATURE = `venn-beta
  title What makes a good feature
  set Desirable
  set Feasible
  set Viable
  union Desirable,Feasible["Buildable"]
  union Feasible,Viable["Sustainable"]
  union Desirable,Viable["Marketable"]
  union Desirable,Feasible,Viable["Ship it"]`;

// :N sizes the circles and the overlap; text lines attach to the latest set or union.
const SIZED = `venn-beta
  set A["Frontend"]:20
    text A1["React"]
    text A2["Design Systems"]
  set B["Backend"]:12
    text B1["API"]
  union A,B["Shared"]:3
    text AB1["OpenAPI"]
  style A fill:#ff6b6b
  style A,B color:#333
  style A1 color:red`;

// Naming the previous theme and look in frontmatter overrides the Venn defaults.
const CLASSIC = `---
config:
  theme: default
  look: classic
---
venn-beta
  title What makes a good feature
  set Desirable
  set Feasible
  set Viable
  union Desirable,Feasible["Buildable"]
  union Feasible,Viable["Sustainable"]
  union Desirable,Viable["Marketable"]
  union Desirable,Feasible,Viable["Ship it"]`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Three-set overlap', code: FEATURE },
      { label: 'Sizes, text, styles', code: SIZED },
      { label: 'Classic look', code: CLASSIC },
    ],
  });

export default mount;
