// ER styling with classDef default and class lists, then the layout config (ELK default, dagre on request)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const ENTITIES = `    CAR {
        string registrationNumber
        string make
        string model
    }
    PERSON {
        string firstName
        string lastName
        int age
    }
    PERSON:::foo ||--|| CAR : owns
    PERSON o{--|| HOUSE:::bar : has
`;

// A class named default goes to every entity without its own class; foo and bar override it.
const DEFAULT = `erDiagram
${ENTITIES}
    classDef default fill:#f9f,stroke-width:4px,color:#111
    classDef foo stroke:#f00
    classDef bar stroke:#0f0`;

// class takes a node list, and a class list too: several classes attached to several entities at once.
const LISTS = `erDiagram
${ENTITIES}
    classDef rounded stroke-width:3px
    classDef warm fill:#fde68a,color:#222
    classDef cool fill:#bae6fd,color:#222
    class PERSON,HOUSE rounded,warm
    class CAR cool`;

// The shorthand attaches several classes too: nodeId:::className1,className2.
const SHORTHAND = `erDiagram
    CAR:::tinted,thick {
        string registrationNumber
        string make
    }
    PERSON:::thick {
        string firstName
        int age
    }
    HOUSE:::tinted
    PERSON ||--|| CAR : owns
    classDef tinted fill:#86efac,color:#222
    classDef thick stroke-width:4px,stroke:#166534`;

const ORDER = `    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`;

// layout: dagre in the frontmatter config swaps the ELK default for the classic Dagre layout.
const DAGRE = `---
title: Order example
config:
    layout: dagre
---
erDiagram
${ORDER}`;

// The same diagram without the key: ELK lays it out.
const ELK = `---
title: Order example
---
erDiagram
${ORDER}`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'classDef default', code: DEFAULT },
      { label: 'class lists', code: LISTS },
      { label: '::: with several classes', code: SHORTHAND },
      { label: 'Layout: ELK default', code: ELK },
      { label: 'Layout: dagre', code: DAGRE },
    ],
  });

export default mount;
