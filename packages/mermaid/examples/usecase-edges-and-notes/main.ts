// Use case diagrams: association operators, edge ids with styles and animation, link length and notes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// All seven solid operators; the marker shows direction and type. %% lines are whole-line comments.
const OPERATORS = `usecase-beta
%% Each relationship is a separate statement.
actor User
actor Support
Start
Finish
User --> Start
Start <-- Support
Start -- Finish
User --o Start
Start o-- Support
User --x Finish
Finish x-- Support`;

// An id before @ names the edge so class, style and metadata statements can target it.
const EDGE_IDS = `usecase-beta
actor Customer
Checkout
Payment
Customer opens@-- "starts checkout" ---> Checkout
Checkout payment@..> : include Payment
classDef emphasized stroke:#f87171,stroke-width:3px
class opens,payment emphasized
style opens stroke:#38bdf8,stroke-width:4px
opens@{ animation: fast }
payment@{ animate: true }`;

// Extra dashes ask the layout for longer edges: --> is minlen 1, ---> is 2, ----> is 3.
const LENGTH = `usecase-beta
direction LR
actor A
Short
Medium
Long
A --> Short
A ---> Medium
A ----> Long`;

// A note attaches to one actor or use case (even one declared later) and joins the layout as a node.
const NOTES = `usecase-beta
note for Login "\`Requires an **active session**\`"
note for User "Starts the workflow"
actor User
Login("Sign in")
Dashboard
User --> Login
Login --> Dashboard`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Operators', code: OPERATORS },
      { label: 'Edge ids and animation', code: EDGE_IDS },
      { label: 'Link length', code: LENGTH },
      { label: 'Notes', code: NOTES },
    ],
  });

export default mount;
