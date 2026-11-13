// Directives: multi-line and merged %%{init}%% forms, then flowchart and sequence diagram config through them
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const FLOW = `graph TD
A(Forest) --> B[/Another/]
A --> C[End]
  subgraph section
  B
  C
  end`;

const TALK = `sequenceDiagram
Alice->Bob: Hello Bob, how are you?
Bob->Alice: Fine, how did your mother like the book I suggested? And did you catch the new book about alien invasion?
Alice->Bob: Good.
Bob->Alice: Cool`;

// The multi-line form: root key init, general settings at the top level, and each diagram's
// settings one level down under its own config key (flowchart, sequence).
const MULTILINE = `%%{
  init: {
    "theme": "forest",
    "fontFamily": "monospace",
    "htmlLabels": true,
    "flowchart": {
      "curve": "linear"
    },
    "sequence": {
      "mirrorActors": true
    }
  }
}%%
${FLOW}`;

// Two directives are grouped into one init object; the last value given for a key wins (theme dark).
const MERGED = `%%{init: { "theme": "forest", "flowchart": { "curve": "stepAfter" } } }%%
%%{initialize: { "theme": "dark", "fontFamily": "Georgia, serif" } }%%
${FLOW}`;

// Only the flowchart section changes: curve linear gives straight segments between nodes.
const LINEAR = `%%{init: { "flowchart": { "curve": "linear", "diagramPadding": 30 } } }%%
${FLOW}`;

// The same data with the other curve the docs name, so the two are easy to compare.
const BASIS = `%%{init: { "flowchart": { "curve": "basis", "diagramPadding": 30 } } }%%
${FLOW}`;

// Sequence config: wrap wraps long messages inside a width of 300 instead of stretching the diagram.
const WRAP = `%%{init: { "sequence": { "wrap": true, "width": 300 } } }%%
${TALK}`;

// More sequence keys: messageAlign, rightAngles, showSequenceNumbers and mirrorActors together.
const SEQ_KEYS = `%%{init: { "sequence": { "messageAlign": "left", "rightAngles": true, "showSequenceNumbers": true, "mirrorActors": false } } }%%
sequenceDiagram
Alice->>Bob: Hello Bob
Bob-->>Alice: Hi Alice
Alice->>Bob: Right-angled arrows, numbers, no bottom actors`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Multi-line init', code: MULTILINE },
      { label: 'init + initialize merge', code: MERGED },
      { label: 'Flowchart linear', code: LINEAR },
      { label: 'Flowchart basis', code: BASIS },
      { label: 'Sequence wrap', code: WRAP },
      { label: 'Sequence keys', code: SEQ_KEYS },
    ],
  });

export default mount;
