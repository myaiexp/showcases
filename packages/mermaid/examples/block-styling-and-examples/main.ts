// Block diagrams: individual and class styling, then two worked examples (architecture, business process)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// style id applies CSS properties to one block: fill, stroke, width, text colour and dashes.
const STYLE = `block
  id1 space id2
  id1("Start")-->id2("Stop")
  style id1 fill:#636,stroke:#333,stroke-width:4px
  style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5`;

// classDef names a set of styles and class applies it; a direct style on B sits on top of that.
const CLASS = `block
  A space B
  A-->B
  classDef blue fill:#6e6ce6,stroke:#333,stroke-width:4px;
  class A blue
  style B fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5`;

// Worked example: software architecture. Block arrows connect the tiers; classes colour by type.
const ARCHITECTURE = `block
  columns 3
  Frontend blockArrowId6<[" "]>(right) Backend
  space:2 down<[" "]>(down)
  Disk left<[" "]>(left) Database[("Database")]

  classDef front fill:#696,stroke:#333;
  classDef back fill:#969,stroke:#333;
  class Frontend front
  class Backend,Database back`;

// Worked example: a business process with a decision, labelled block arrows and a start and end circle.
const PROCESS = `block
  columns 3
  Start(("Start")) space:2
  down<[" "]>(down) space:2
  Decision{{"Make Decision"}} right<["Yes"]>(right) Process1["Process A"]
  downAgain<["No"]>(down) space r3<["Done"]>(down)
  Process2["Process B"] r2<["Done"]>(right) End(("End"))

  style Start fill:#969;
  style End fill:#696;`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'System architecture', code: ARCHITECTURE },
      { label: 'Business process', code: PROCESS },
      { label: 'Single block style', code: STYLE },
      { label: 'Class styling', code: CLASS },
    ],
  });

export default mount;
