// ER diagrams: crow's foot cardinality markers, identification and word aliases
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A small shop: || exactly one, o{ zero or more, |{ one or more, |o zero or one.
const SHOP = `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    PRODUCT ||--o{ LINE-ITEM : "appears in"
    CUSTOMER |o--|| LOYALTY-CARD : holds`;

// -- is identifying (solid), .. is non-identifying (dashed).
const IDENTIFYING = `erDiagram
    CAR ||--o{ NAMED-DRIVER : allows
    PERSON }o..o{ NAMED-DRIVER : is
    PERSON }|..|{ CAR : driver`;

// The same relationships written with words instead of symbols.
const WORDS = `erDiagram
    CAR 1 to zero or more NAMED-DRIVER : allows
    PERSON many(0) optionally to 0+ NAMED-DRIVER : is
    MANUFACTURER only one to one or more CAR : makes`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Crow\'s foot markers', code: SHOP },
      { label: 'Identifying or not', code: IDENTIFYING },
      { label: 'Word aliases', code: WORDS },
    ],
    interval: 4500,
  });

export default mount;
