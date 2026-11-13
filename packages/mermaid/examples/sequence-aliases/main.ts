// Participant aliases: external `as`, inline "alias" in the config object, and which one wins when both are given
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// External syntax: a short id for the messages, a descriptive label after `as`.
const EXTERNAL = `sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!`;

// The external alias also works on participants with a stereotype type.
const TYPED = `sequenceDiagram
    participant API@{ "type": "boundary" } as Public API
    actor DB@{ "type": "database" } as User Database
    participant Svc@{ "type": "control" } as Auth Service
    API->>Svc: Authenticate
    Svc->>DB: Query user
    DB-->>Svc: User data
    Svc-->>API: Token`;

// Inline syntax: the label lives in the config object's "alias" field, no `as` needed.
const INLINE = `sequenceDiagram
    participant API@{ "type": "boundary", "alias": "Public API" }
    participant Auth@{ "type": "control", "alias": "Auth Service" }
    participant DB@{ "type": "database", "alias": "User Database" }
    API->>Auth: Login request
    Auth->>DB: Query user
    DB-->>Auth: User data
    Auth-->>API: Access token`;

// With both given, the external alias takes precedence: the diagram shows "External Name"
// and "External DB", never the inline ones.
const PRECEDENCE = `sequenceDiagram
    participant API@{ "type": "boundary", "alias": "Internal Name" } as External Name
    participant DB@{ "type": "database", "alias": "Internal DB" } as External DB
    API->>DB: Query
    DB-->>API: Result`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'External: as', code: EXTERNAL },
      { label: 'External on typed participants', code: TYPED },
      { label: 'Inline: "alias"', code: INLINE },
      { label: 'Precedence', code: PRECEDENCE },
    ],
  });

export default mount;
