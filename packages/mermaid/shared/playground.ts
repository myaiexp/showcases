// Diagram playground: cards cycle variants, the full view adds a live editor
import type { Cleanup, MountContext } from '@/types.ts';
import { renderInto } from './setup.ts';

export interface Variant {
  label: string;
  code: string;
}

export interface PlaygroundOptions {
  variants: readonly Variant[];
  /** Milliseconds each variant stays up in a preview card before the next one renders. */
  interval?: number;
}

/** A full-width box a diagram renders into, sized for a card or the full view. */
export function diagramBox(el: HTMLElement, preview: boolean): HTMLDivElement {
  const box = document.createElement('div');
  box.className = preview ? 'mm-diagram mm-diagram-card' : 'mm-diagram';
  el.append(box);
  return box;
}

/** A status line under a diagram: which type rendered, or the parse error. */
export function statusLine(el: HTMLElement): (text: string, error?: boolean) => void {
  const line = document.createElement('p');
  line.className = 'mm-status';
  el.append(line);
  return (text, error = false) => {
    line.textContent = text;
    line.classList.toggle('mm-error', error);
  };
}

/**
 * Renders one of several diagram definitions. A preview card shows them in turn; the full
 * view shows tabs to pick one and a textarea that re-renders the diagram as you type.
 */
export function playground(el: HTMLElement, { preview, signal }: MountContext, opts: PlaygroundOptions): Cleanup {
  const { variants } = opts;
  const box = diagramBox(el, preview);
  let timer = 0;
  // Each render takes a ticket; a slower, older render never overwrites a newer one.
  let ticket = 0;

  const show = async (code: string, report?: (t: string, e?: boolean) => void): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      const { diagramType } = await renderInto(staging, code, signal);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report?.(`Rendered as ${diagramType}`);
    } catch (err) {
      if (mine !== ticket || signal.aborted) return;
      if (!report) throw err;
      report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      void show(variants[i % variants.length]!.code).catch((err: unknown) => {
        box.textContent = err instanceof Error ? err.message : String(err);
      });
      i++;
      if (variants.length > 1) timer = window.setTimeout(next, opts.interval ?? 3500);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const tabs = document.createElement('div');
  tabs.className = 'mm-tabs';
  const editor = document.createElement('textarea');
  editor.className = 'mm-editor';
  editor.spellcheck = false;
  editor.setAttribute('aria-label', 'Diagram definition');
  const report = statusLine(el);
  el.insertBefore(tabs, box);
  el.append(editor);
  if (variants.length < 2) tabs.hidden = true;

  const pick = (v: Variant, button: HTMLButtonElement): void => {
    for (const b of tabs.children) b.classList.toggle('active', b === button);
    editor.value = v.code;
    void show(v.code, report);
  };
  variants.forEach((v, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = v.label;
    b.addEventListener('click', () => pick(v, b));
    tabs.append(b);
    if (n === 0) pick(v, b);
  });

  const onInput = (): void => {
    clearTimeout(timer);
    timer = window.setTimeout(() => void show(editor.value, report), 350);
  };
  editor.addEventListener('input', onInput);
  return () => {
    ticket++;
    clearTimeout(timer);
    editor.removeEventListener('input', onInput);
  };
}
