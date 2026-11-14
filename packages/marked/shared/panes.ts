// Panes for Marked examples: Markdown source, rendered page, HTML source, layout
import DOMPurify from 'dompurify';
import type { Stage } from './stage.ts';
import './marked.css';

export interface SourcePane {
  el: HTMLElement;
  /** The current Markdown. */
  value(): string;
  /** Replaces the Markdown (and, in a card, scrolls the caret into view). */
  set(text: string): void;
  /** Calls `fn` on every edit (full view only; cards have no input). */
  onInput(fn: (text: string) => void): void;
}

export interface DocPane {
  el: HTMLElement;
  /** Where the rendered HTML goes. */
  body: HTMLElement;
  /** Sanitizes `html` with DOMPurify (the docs' Usage warning) and puts it on the page. */
  show(html: string): void;
}

export interface TextPane {
  el: HTMLElement;
  show(text: string): void;
}

function pane(label: string | undefined, cls: string, child: HTMLElement): HTMLElement {
  const box = document.createElement('div');
  box.className = `mk-pane ${cls}`;
  if (label) {
    const l = document.createElement('div');
    l.className = 'mk-label';
    l.textContent = label;
    box.append(l);
  }
  box.append(child);
  return box;
}

/** Markdown input: a textarea in the full view, a read-only block with a caret in a card. */
export function sourcePane(stage: Stage, text: string, label = 'Markdown'): SourcePane {
  if (stage.preview) {
    const pre = document.createElement('pre');
    pre.className = 'mk-src';
    const body = document.createTextNode(text);
    const caret = document.createElement('span');
    caret.className = 'mk-caret';
    pre.append(body, caret);
    return {
      el: pane(label, 'mk-pane-src', pre),
      value: () => body.data,
      set(next) {
        body.data = next;
        pre.scrollTop = pre.scrollHeight;
      },
      onInput() {},
    };
  }
  const area = document.createElement('textarea');
  area.className = 'mk-src';
  area.spellcheck = false;
  area.value = text;
  const listeners: ((t: string) => void)[] = [];
  stage.listen(area, 'input', () => {
    for (const fn of listeners) fn(area.value);
  });
  return {
    el: pane(label, 'mk-pane-src', area),
    value: () => area.value,
    set(next) {
      area.value = next;
    },
    onInput(fn) {
      listeners.push(fn);
    },
  };
}

/** Rendered output. Link clicks never navigate (an `href="#x"` would change the gallery route). */
export function docPane(stage: Stage, label = 'What readers see'): DocPane {
  const body = document.createElement('div');
  body.className = 'mk-doc';
  stage.listen(body, 'click', (e) => {
    const a = (e.target as Element).closest('a');
    if (!a || !body.contains(a)) return;
    e.preventDefault();
    const href = a.getAttribute('href') ?? '';
    const target = href.startsWith('#') ? body.querySelector(`[id="${CSS.escape(href.slice(1))}"]`) : null;
    const flash = (target ?? a) as HTMLElement;
    target?.scrollIntoView({ block: 'nearest' });
    flash.animate([{ background: 'var(--accent)' }, { background: 'transparent' }], { duration: 700 });
  });
  return {
    el: pane(label, 'mk-pane-doc', body),
    body,
    show(html) {
      putHtml(body, DOMPurify.sanitize(html));
      if (stage.preview) body.scrollTop = body.scrollHeight;
    },
  };
}

/** A grey "picture" box that stands in for any image URL that would need the network. */
const OFFLINE_IMG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40"><rect width="64" height="40" rx="4" fill="#3a3f4b"/>' +
      '<path d="M10 32 L26 16 L36 26 L42 20 L54 32Z" fill="#6b7280"/><circle cx="46" cy="12" r="4" fill="#6b7280"/></svg>',
  );

/**
 * Puts already-sanitized HTML into `target`. It is parsed in an inert <template> first, so an
 * `<img src="x">` from sample Markdown is swapped for a local picture before it can load.
 */
export function putHtml(target: HTMLElement, cleanHtml: string): void {
  const t = document.createElement('template');
  t.innerHTML = cleanHtml;
  for (const img of t.content.querySelectorAll('img')) {
    const src = img.getAttribute('src') ?? '';
    if (!/^(data|blob):/i.test(src)) {
      img.setAttribute('src', OFFLINE_IMG);
      img.title ||= `(offline stand-in for ${src})`;
    }
  }
  target.replaceChildren(t.content);
}

/** Shows an HTML string as text, with the tags tinted, so readers see what Marked produced. */
export function htmlPane(stage: Stage, label = 'HTML Marked produced'): TextPane {
  const pre = document.createElement('pre');
  pre.className = 'mk-html';
  return {
    el: pane(label, 'mk-pane-html', pre),
    show(html) {
      pre.replaceChildren();
      for (const part of html.split(/(<[^>]+>)/g)) {
        if (!part) continue;
        if (part.startsWith('<')) {
          const tag = document.createElement('span');
          tag.className = 'mk-tag';
          tag.textContent = part;
          pre.append(tag);
        } else pre.append(part);
      }
      if (stage.preview) pre.scrollTop = pre.scrollHeight;
    },
  };
}

/** A plain monospace text block: logs, plain-text output, JSON. */
export function textPane(stage: Stage, label: string): TextPane {
  const pre = document.createElement('pre');
  pre.className = 'mk-text';
  return {
    el: pane(label, 'mk-pane-text', pre),
    show(text) {
      pre.textContent = text;
      if (stage.preview) pre.scrollTop = pre.scrollHeight;
    },
  };
}

/** Lays panes side by side (cards always; the full view wraps on narrow screens). */
export function row(parent: HTMLElement, ...panes: HTMLElement[]): HTMLElement {
  const r = document.createElement('div');
  r.className = 'mk-row';
  r.append(...panes);
  parent.append(r);
  return r;
}

/** A short line of explanation under the panes (full view) or over them (card). */
export function note(parent: HTMLElement, text: string): HTMLElement {
  const n = document.createElement('div');
  n.className = 'mk-note';
  n.textContent = text;
  parent.append(n);
  return n;
}
