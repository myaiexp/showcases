// Sequence notes, activation bars with +/- shortcuts, line breaks and autonumber
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// autonumber numbers every arrow; activate/deactivate and the +/- suffixes draw activation bars.
const ORDER_FLOW = `sequenceDiagram
    autonumber
    actor Customer
    participant Web as Web app
    participant API as API gateway
    participant Bank
    Customer->>Web: Place order
    Web->>API: POST /orders
    activate API
    API->>Bank: Authorise payment
    Bank-->>API: Approved
    API-->>Web: 201 Created
    deactivate API
    Web-->>Customer: Order confirmed
    Note over Customer,Bank: One order, one transaction`;

// Activations stack for the same actor, using the arrow suffixes.
const STACKED = `sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!`;

// Notes right of, left of and over actors; <br/> breaks lines; autonumber with a loop.
const NOTES = `sequenceDiagram
    autonumber
    participant Alice as Alice<br/>Johnson
    Alice->John: Hello John,<br/>how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    Note left of Alice: Waiting
    John-->>Alice: Great!
    Note over Alice,John: A typical interaction<br/>But now in two lines`;

// Every arrow type: solid/dotted, open, arrowhead, cross, async, bidirectional.
const ARROWS = `sequenceDiagram
    Alice->John: solid line, no arrow
    Alice-->John: dotted line, no arrow
    Alice->>John: solid with arrowhead
    Alice-->>John: dotted with arrowhead
    Alice<<->>John: bidirectional
    Alice-xJohn: solid with cross
    Alice--xJohn: dotted with cross
    Alice-)John: async
    Alice--)John: dotted async`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Stacked activations', code: STACKED },
      { label: 'Order flow, numbered', code: ORDER_FLOW },
      { label: 'Notes and line breaks', code: NOTES },
      { label: 'Arrow types', code: ARROWS },
    ],
    interval: 4500,
  });

export default mount;
