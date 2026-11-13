// Block diagrams: shapes, block arrows, space blocks and edges, all placed by hand
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Shapes available for blocks, three columns wide.
const SHAPES = String.raw`block
  columns 3
  round("Round edges") stadium(["Stadium"]) sub[["Subroutine"]]
  db[("Database")] circle(("Circle")) dbl((("Double circle")))
  asym>"Asymmetric"] rhombus{"Rhombus"} hexa{{"Hexagon"}}
  para[/"Parallelogram"/] alt[\"Alt parallelogram"\] trap[/"Trapezoid"\]`;

// A flow: block arrows point between blocks, space leaves holes, classDef colors by role.
const FLOW = `block
  columns 3
  Frontend blockArrowId6<[" "]>(right) Backend
  space:2 down<[" "]>(down)
  Disk left<[" "]>(left) Database[("Database")]
  classDef front fill:#696,stroke:#333;
  classDef back fill:#969,stroke:#333;
  class Frontend front
  class Backend,Database back`;

// Edges link blocks laid out with space; a label goes between the dashes.
const EDGES = `block
  columns 4
  Client space:2 Server
  space:4
  Cache space:2 Store[("Store")]
  Client-- "request" -->Server
  Server-- "miss" -->Store
  Server-->Cache
  style Client fill:#636,stroke:#333,stroke-width:4px
  style Store fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Block shapes', code: SHAPES },
      { label: 'Block arrows and space', code: FLOW },
      { label: 'Edges and styles', code: EDGES },
    ],
  });

export default mount;
