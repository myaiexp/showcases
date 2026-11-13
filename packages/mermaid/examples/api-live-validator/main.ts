// textarea checked with mermaid.parse (suppressErrors) and mermaid.detectType as you type; renders only when valid
import type { Mount } from '@/types.ts';
import { diagramBox } from '../../shared/playground.ts';
import { mermaid, renderInto } from '../../shared/setup.ts';

// Valid snippets and broken ones (a misspelled keyword, an unfinished edge) for the card to cycle.
const SNIPPETS = [
  `flowchart LR
    Draft --> Review --> Publish`,
  `sequenceDiagram
    Alice->>Bob: Is this valid?
    Bob-->>Alice: Yes`,
  `flowchart LR
    Draft -->`,
  `pie title Pets
    "Dogs" : 386
    "Cats" : 85`,
  `flowchar LR
    A --> B`,
  `stateDiagram-v2
    [*] --> Idle
    Idle --> Busy
    Busy --> [*]`,
];

interface Verdict {
  valid: boolean;
  type: string;
}

/** parse() with suppressErrors returns false instead of throwing; detectType() throws on unknown text. */
async function check(text: string): Promise<Verdict> {
  let type = 'unknown';
  try {
    type = mermaid.detectType(text);
  } catch {
    // Not a recognisable diagram keyword.
  }
  const result = await mermaid.parse(text, { suppressErrors: true });
  return { valid: result !== false, type };
}

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const badge = document.createElement('p');
  badge.className = 'mm-status';
  el.insertBefore(badge, box);
  let ticket = 0;
  let timer = 0;

  const run = async (text: string): Promise<void> => {
    const mine = ++ticket;
    try {
      const verdict = await check(text);
      if (mine !== ticket || signal.aborted) return;
      badge.classList.toggle('mm-error', !verdict.valid);
      badge.textContent = verdict.valid
        ? `Valid ${verdict.type}`
        : `Invalid (detectType says: ${verdict.type})`;
      if (!verdict.valid) {
        box.replaceChildren();
        box.textContent = 'Nothing rendered: parse returned false.';
        return;
      }
      const staging = document.createElement('div');
      await renderInto(staging, text, signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
    } catch (err) {
      if (mine === ticket && !signal.aborted) badge.textContent = err instanceof Error ? err.message : String(err);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      void run(SNIPPETS[i++ % SNIPPETS.length]!);
      timer = window.setTimeout(next, 2400);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const editor = document.createElement('textarea');
  editor.className = 'mm-editor';
  editor.spellcheck = false;
  editor.setAttribute('aria-label', 'Diagram definition');
  editor.value = SNIPPETS[0]!;
  el.append(editor);
  const onInput = (): void => {
    clearTimeout(timer);
    timer = window.setTimeout(() => void run(editor.value), 250);
  };
  editor.addEventListener('input', onInput);
  void run(editor.value);
  return () => {
    ticket++;
    clearTimeout(timer);
    editor.removeEventListener('input', onInput);
  };
};

export default mount;
