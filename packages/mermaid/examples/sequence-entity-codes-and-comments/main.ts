// Sequence text details: #entity; codes, %% comments and <br/> line breaks, including in participant names
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// #9829; is a decimal character code and #infin; an HTML entity name.
const ENTITIES = `sequenceDiagram
    A->>B: I #9829; you!
    B->>A: I #9829; you #infin; times more!`;

// A semicolon can end a statement, so inside message text it has to be written #59;.
const SEMICOLON = `sequenceDiagram
    Client->>Server: GET /items#59; limit=10
    Server-->>Client: 200 OK #35;42 #9989;`;

// Lines starting with %% are ignored, so a message can be commented out without deleting it.
const COMMENTS = `sequenceDiagram
    Alice->>John: Hello John, how are you?
    %% this is a comment
    %% John->>Alice: this reply is switched off
    John-->>Alice: Great!`;

// <br/> breaks a message or a note over two lines.
const BREAKS = `sequenceDiagram
    Alice->John: Hello John,<br/>how are you?
    Note over Alice,John: A typical interaction<br/>But now in two lines`;

// A participant name can only break across lines through an alias.
const NAMES = `sequenceDiagram
    participant Alice as Alice<br/>Johnson
    participant John as John<br/>Smith
    Alice->John: Hello John,<br/>how are you?
    Note over Alice,John: A typical interaction<br/>But now in two lines`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Entity codes', code: ENTITIES },
      { label: 'Semicolon as #59;', code: SEMICOLON },
      { label: 'Comments', code: COMMENTS },
      { label: 'Line breaks', code: BREAKS },
      { label: 'Line breaks in names', code: NAMES },
    ],
  });

export default mount;
