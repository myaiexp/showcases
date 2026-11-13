// Sequence config parameters as live controls: the frontmatter config is rebuilt on every change
import type { Mount } from '@/types.ts';
import { liveDiagram, type State } from '../../shared/controls.ts';

// The diagram has a multi-line message, a long message to wrap, a note, a loop and a self message,
// so every control below has something to act on.
const BODY = `sequenceDiagram
    participant Alice
    participant Bob
    participant Carol
    Alice->>Bob: Hello Bob,<br/>how are you doing today?
    Note over Alice,Bob: A note over two actors<br/>on two lines
    Bob->>Bob: Think it over
    loop Every minute
        Bob->>Carol: A rather long message text that only fits on one line if nothing wraps it
        Carol-->>Bob: ok
    end
    Bob-->>Alice: Fine, thanks!`;

// Starting values: the library's own defaults for the margins, and mirrorActors off so the
// toggle visibly adds the lower actor row. Every key is written out, so the frontmatter
// under the diagram always shows what the controls currently set.
const INITIAL: State = {
  mirrorActors: false,
  actorMargin: 50,
  messageMargin: 35,
  boxMargin: 10,
  messageAlign: 'center',
  noteAlign: 'center',
  wrap: false,
  rightAngles: false,
  messageFontSize: 16,
};

const build = (v: State): string => {
  const lines = Object.keys(INITIAL).map((k) => `    ${k}: ${v[k]}`);
  return `---\nconfig:\n  sequence:\n${lines.join('\n')}\n---\n${BODY}`;
};

const mount: Mount = (el, ctx) =>
  liveDiagram(el, ctx, {
    initial: INITIAL,
    build,
    controls: [
      { kind: 'check', key: 'mirrorActors', label: 'mirrorActors' },
      { kind: 'range', key: 'actorMargin', label: 'actorMargin', min: 10, max: 150, step: 10 },
      { kind: 'range', key: 'messageMargin', label: 'messageMargin', min: 20, max: 80, step: 5 },
      { kind: 'range', key: 'boxMargin', label: 'boxMargin', min: 0, max: 40, step: 5 },
      { kind: 'select', key: 'messageAlign', label: 'messageAlign', options: ['left', 'center', 'right'] },
      { kind: 'select', key: 'noteAlign', label: 'noteAlign', options: ['left', 'center', 'right'] },
      { kind: 'check', key: 'wrap', label: 'wrap' },
      { kind: 'check', key: 'rightAngles', label: 'rightAngles' },
      { kind: 'range', key: 'messageFontSize', label: 'messageFontSize', min: 10, max: 24 },
    ],
    // A card has no controls; it steps through three combinations.
    presets: [
      INITIAL,
      { ...INITIAL, mirrorActors: true, actorMargin: 100, messageAlign: 'left', rightAngles: true },
      { ...INITIAL, wrap: true, messageMargin: 55, noteAlign: 'right', messageFontSize: 12 },
    ],
  });

export default mount;
