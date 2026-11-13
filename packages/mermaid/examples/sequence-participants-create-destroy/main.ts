// Sequence participants: actors, typed participants with aliases, boxes, create and destroy
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Compact first: an actor and typed participants with aliases (`as`) and the @{ type } syntax.
const TYPED = `sequenceDiagram
    actor User
    participant API@{ "type": "boundary" } as Public API
    participant Svc@{ "type": "control" } as Auth Service
    participant DB@{ "type": "database" } as User Database
    User->>API: Sign in
    API->>Svc: Authenticate
    Svc->>DB: Query user
    DB-->>Svc: User data
    Svc-->>API: Token
    API-->>User: Signed in`;

// create / destroy before a message: Carl and Donald join late, Carl and Bob leave early.
const LIFECYCLE = `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you ?
    Bob->>Alice: Fine, thank you. And you?
    create participant Carl
    Alice->>Carl: Hi Carl!
    create actor D as Donald
    Carl->>D: Hi!
    destroy Carl
    Alice-xCarl: We are too many
    destroy Bob
    Bob->>Alice: I agree`;

// box groups participants; a colour goes before the label.
const BOXES = `sequenceDiagram
    box Purple Frontend
    participant W as Web app
    participant M as Mobile app
    end
    box rgb(33,66,99) Backend
    participant A as API
    participant Q@{ "type": "queue" } as Job queue
    end
    W->>A: Create report
    M->>A: Create report
    A-)Q: Enqueue job
    Q--)A: Job done
    A-->>W: Report ready
    A-->>M: Report ready`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Typed participants', code: TYPED },
      { label: 'Create and destroy', code: LIFECYCLE },
      { label: 'Boxes', code: BOXES },
    ],
    interval: 4500,
  });

export default mount;
