// ER subgraphs: grouping, ids and titles, relationships to a subgraph, and per-subgraph direction
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// subgraph ... end groups entities; subgraphs nest. Entities declared inside a subgraph belong to it.
const GROUPING = `erDiagram
    subgraph title1
        CUSTOMER
        CUSTOMER {
            string name
            string custNumber
            string sector
        }
    end
    subgraph title2
        CAR ||--o{ NAMED-DRIVER : allows
        subgraph title3
            PERSON
            PERSON {
                string firstName
                string lastName
                int age
            }
        end
    end`;

// A one-word name is both id and title; several words need quotes; "id [title]" sets them apart.
const TITLES = `erDiagram
    subgraph Billing
        INVOICE
    end
    subgraph "Customer Domain"
        CUSTOMER
    end
    subgraph orders [Order handling]
        ORDER
    end`;

// Subgraphs are referenced by id, never by title, and an id with spaces needs quotes.
// Relationships may end at a subgraph, or at an entity inside one.
const RELATIONSHIPS = `erDiagram
    subgraph title1
        A1 ||--|| A2 : links
    end

    subgraph title2
        B1 ||--|| B2 : links
    end

    subgraph title3
        C1 ||--|| C2 : links
    end

    title1 ||--|| title2 : links
    title2 ||--|| title3 : links
    title2 ||--|| C2 : links`;

// A subgraph can set its own direction, overriding the diagram's LR.
const DIRECTION = `erDiagram
    direction LR
    subgraph TOP
        direction TB
        subgraph B1
            direction RL
            I1 ||--|| F1 : links
        end
        subgraph B2
            direction BT
            I2 ||--|| F2 : links
        end
    end
    A ||--|| TOP : links
    TOP ||--|| B : links
    B1 ||--|| B2 : links`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Grouping and nesting', code: GROUPING },
      { label: 'Ids and titles', code: TITLES },
      { label: 'Relationships to subgraphs', code: RELATIONSHIPS },
      { label: 'Direction in subgraphs', code: DIRECTION },
    ],
  });

export default mount;
