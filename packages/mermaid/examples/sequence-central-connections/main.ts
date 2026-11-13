// Central connections: () on either side of a sequence arrow ends the message at the lifeline itself
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// ()John after the arrow ends the message on John's lifeline; Alice() before it starts from Alice's.
// Using both gives a message that touches two lifelines only, with nothing at the boxes.
const BASIC = `sequenceDiagram
    participant Alice
    participant John
    Alice->>()John: Hello John
    Alice()->>John: How are you?
    John()->>()Alice: Great!`;

// The same marker works on dotted arrows, so a signal can be drawn arriving without a sender.
const DOTTED = `sequenceDiagram
    participant Sensor
    participant Hub
    participant Dash as Dashboard
    Sensor()-->>Hub: reading
    Hub()->>()Dash: update
    Dash()-->>Hub: ack`;

// A sequence mixing ordinary messages and central ones, across three participants.
const MIXED = `sequenceDiagram
    participant Client
    participant Bus
    participant Worker
    Client->>Bus: publish job
    Bus()->>()Worker: deliver
    Worker()-->>()Bus: progress
    Worker->>Client: done`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Basic', code: BASIC },
      { label: 'Dotted lines', code: DOTTED },
      { label: 'Mixed with plain messages', code: MIXED },
    ],
  });

export default mount;
