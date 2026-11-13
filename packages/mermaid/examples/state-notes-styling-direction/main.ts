// State diagrams: notes, direction and classDef styling with class and :::
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// classDef plus the ::: operator on states inside transitions.
const STYLED = `stateDiagram
   direction TB
   classDef notMoving fill:white,color:black
   classDef movement font-style:italic
   classDef badBadEvent fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow
   [*] --> Still:::notMoving
   Still --> [*]
   Still --> Moving:::movement
   Moving --> Still
   Moving --> Crash:::movement
   Crash:::badBadEvent --> [*]`;

// The class statement attaches styles to named states afterwards.
const CLASS_STATEMENT = `stateDiagram
   classDef notMoving fill:white,color:black
   classDef movement font-style:italic
   classDef badBadEvent fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow
   [*] --> Still
   Still --> Moving
   Moving --> Still
   Moving --> Crash
   Crash --> [*]
   class Still notMoving
   class Moving, Crash movement
   class Crash badBadEvent`;

// Notes right of / left of a state, one multi-line and one inline.
const NOTES = `stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.`;

// direction LR, also inside a composite state; spaces in names come from an id plus a description.
const DIRECTION = `stateDiagram
    direction LR
    classDef yourState font-style:italic,font-weight:bold,fill:white,color:black
    yswsii: Your state with spaces in it
    [*] --> yswsii:::yourState
    yswsii --> B
    state B {
      direction LR
      a --> b
    }
    B --> D`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Styled with :::', code: STYLED },
      { label: 'Styled with class', code: CLASS_STATEMENT },
      { label: 'Notes', code: NOTES },
      { label: 'Direction and names', code: DIRECTION },
    ],
    interval: 4500,
  });

export default mount;
