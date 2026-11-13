// Venn: higher-arity unions, id versus label, and style statements
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A three-set union also draws the pairwise overlaps, so its label has a region of its own.
const TRIPLE = `venn-beta
  title Innovation
  set Desirable
  set Feasible
  set Viable
  union Desirable,Feasible,Viable["Innovation"]`;

// Short ids keep union lines readable; the bracket label is what is drawn. Quoted ids allow spaces.
const LABELS = `venn-beta
  set A["Backend engineers"]
  set B["Data scientists"]
  set "Ops team"["Platform"]
  union A,B["ML pipelines"]
  union A,"Ops team"["Deploys"]
  union A,B,"Ops team"["MLOps"]`;

// Several named overlaps on three sets, with sizes steering how big each region is.
const SIZED = `venn-beta
  set Read["Readers"]:16
  set Write["Writers"]:12
  set Admin["Admins"]:8
  union Read,Write["Editors"]:5
  union Write,Admin["Owners"]:3
  union Read,Write,Admin["Everyone"]:2`;

// style sets fill, text colour, stroke, stroke-width and fill-opacity per set, union or text node.
const STYLED = `venn-beta
  set A["Design"]:16
    text A1["Figma"]
  set B["Code"]:16
    text B1["TypeScript"]
  union A,B["Prototype"]:5
    text AB1["Storybook"]
  style A fill:#f472b6,fill-opacity:0.5,stroke:#f472b6,stroke-width:3
  style B fill:#38bdf8,fill-opacity:0.5,stroke:#38bdf8,stroke-width:3
  style A,B fill:#fde047,fill-opacity:0.8,color:#1f2937
  style A1 color:#fff
  style B1 color:#fff`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Three-way union', code: TRIPLE },
      { label: 'Ids and labels', code: LABELS },
      { label: 'Sizes', code: SIZED },
      { label: 'Styling', code: STYLED },
    ],
  });

export default mount;
