// Sequence control flow: loop, alt/opt, par, critical, break and rect highlights
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// loop, alt/else and opt in one login flow.
const LOOP_ALT = `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
    loop Every minute
        Bob-->Alice: Still there?
    end`;

// par/and runs branches in parallel and can nest.
const PARALLEL = `sequenceDiagram
    par Alice to Bob
        Alice->>Bob: Go help John
    and Alice to John
        Alice->>John: I want this done today
        par John to Charlie
            John->>Charlie: Can we do this today?
        and John to Diana
            John->>Diana: Can you help us today?
        end
    end`;

// critical with option branches, then a break that stops the booking flow.
const CRITICAL_BREAK = `sequenceDiagram
    critical Establish a connection to the DB
        Service-->DB: connect
    option Network timeout
        Service-->Service: Log error
    option Credentials rejected
        Service-->Service: Log different error
    end
    Consumer-->API: Book something
    API-->BookingService: Start booking process
    break when the booking process fails
        API-->Consumer: show failure
    end
    API-->BillingService: Start billing process`;

// rect draws a coloured background with rgb()/rgba(); rects nest.
const RECT = `sequenceDiagram
    participant Alice
    participant John
    rect rgb(191, 223, 255)
    note right of Alice: Alice calls John.
    Alice->>+John: Hello John, how are you?
    rect rgb(200, 150, 255)
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    end
    John-->>-Alice: I feel great!
    end
    Alice ->>+ John: Did you want to go to the game tonight?
    John -->>- Alice: Yeah! See you there.`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Loop, alt, opt', code: LOOP_ALT },
      { label: 'Parallel', code: PARALLEL },
      { label: 'Critical and break', code: CRITICAL_BREAK },
      { label: 'Background rect', code: RECT },
    ],
    interval: 4500,
  });

export default mount;
