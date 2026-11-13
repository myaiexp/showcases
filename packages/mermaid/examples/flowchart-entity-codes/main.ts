// Quotes around awkward text, #entity; codes, unicode labels and %% comments in flowcharts
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Text with brackets or parentheses would end the shape early, so put it in double quotes.
const QUOTED = `flowchart LR
    id1["This is the (text) in the box"]
    id2["Braces {like} these and [these]"]
    id3("Even a | pipe, quoted")
    id1 --> id2 --> id3`;

// Numbers in #n; are base 10 character codes and names such as #quot; are HTML entity names.
// # itself is #35;. This is how a double quote gets into a quoted label.
const ENTITIES = `flowchart LR
    A["A double quote:#quot;"] --> B["A dec char:#9829;"]
    B --> C["A hash sign: #35;"]
    C --> D["Named entities: #lt;b#gt; and #amp;"]`;

// Unicode text goes in quotes too.
const UNICODE = `flowchart LR
    id["This ❤ Unicode"]
    jp["日本語のラベル"]
    em["Arrows ← → and math ∑ ≈ ∞"]
    id --> jp --> em`;

// Lines starting with %% are ignored, including any flow syntax after them, so a whole
// statement can be switched off: the link A --> X below never appears.
const COMMENTS = `flowchart LR
%% this is a comment A -- text --> B{node}
   A -- text --> B -- text2 --> C
%% A --> X
%% anything after the double percent is skipped, even B --> Y`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Quoted text', code: QUOTED },
      { label: 'Entity codes', code: ENTITIES },
      { label: 'Unicode', code: UNICODE },
      { label: 'Comments', code: COMMENTS },
    ],
  });

export default mount;
