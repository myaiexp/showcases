// classDef default, classDef with several names, class with a node list and the ::: shorthand overriding the default
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A class named default is assigned to every node that has no class of its own.
const DEFAULT = `flowchart LR
    A[Plan] --> B[Build] --> C[Test] --> D[Ship]
    classDef default fill:#f9f,stroke:#333,stroke-width:4px,color:#111;`;

// Nodes with a class of their own keep it; default fills in only for the rest.
const OVERRIDE = `flowchart LR
    A[Plan] --> B[Build]:::hot --> C[Test] --> D[Ship]:::hot
    classDef default fill:#334155,stroke:#94a3b8,color:#e2e8f0;
    classDef hot fill:#dc2626,stroke:#fecaca,stroke-width:3px,color:#fff;`;

// One classDef statement can style several classes at once: names separated by commas.
const SEVERAL = `flowchart TD
    A[Input] --> B[Parse] --> C[Validate] --> D[Store]
    class A,B early
    class C,D late
    classDef early,late font-size:16pt,stroke-width:3px;
    classDef early fill:#0e7490,stroke:#a5f3fc,color:#fff;
    classDef late fill:#7c3aed,stroke:#ddd6fe,color:#fff;`;

// class takes a list of node ids, and ::: attaches a class right where a node is declared.
const LISTS = `flowchart LR
    A:::edge --> B --> C --> D --> E:::edge
    B --> F
    class B,C,D,F inner
    classDef edge fill:#16a34a,stroke:#bbf7d0,color:#fff;
    classDef inner fill:#1e293b,stroke:#38bdf8,stroke-dasharray:4 3,color:#e0f2fe;`;

// Styling goes through classDef, not page CSS: Mermaid's own rules are scoped to the SVG
// and marked !important, so an outside .myclass rule is silently overridden.
const CLASSDEF = `flowchart LR
    A:::myStyle --> B
    classDef myStyle fill:#ff0000,stroke:#ffff00,stroke-width:4px`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'classDef default', code: DEFAULT },
      { label: 'Default plus own classes', code: OVERRIDE },
      { label: 'Several classes in one classDef', code: SEVERAL },
      { label: 'class lists and :::', code: LISTS },
      { label: 'Why classDef', code: CLASSDEF },
    ],
  });

export default mount;
