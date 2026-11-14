// Draws Marked tokens as nested coloured boxes: type, text preview, children
import type { Token } from 'marked';
import type { Stage } from './stage.ts';

/** A stable colour per token type, so "heading" looks the same in every example. */
export function typeHue(type: string): number {
  let h = 0;
  for (const c of type) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

function preview(token: Token): string {
  const t = token as { text?: unknown; raw?: unknown };
  const text = typeof t.text === 'string' ? t.text : typeof t.raw === 'string' ? t.raw : '';
  const flat = text.replace(/\n/g, '⏎');
  return flat.length > 40 ? `${flat.slice(0, 39)}…` : flat;
}

/** Child token lists of a token: `tokens`, list `items`, table cells, or named custom fields. */
export function childLists(token: Token, extra: readonly string[] = []): Token[][] {
  const t = token as unknown as Record<string, unknown>;
  const out: Token[][] = [];
  if (token.type === 'list') out.push(t.items as Token[]);
  else if (token.type === 'table') {
    const header = t.header as { tokens: Token[] }[];
    const rows = t.rows as { tokens: Token[] }[][];
    for (const cell of [...header, ...rows.flat()]) out.push(cell.tokens);
  } else if (Array.isArray(t.tokens)) out.push(t.tokens as Token[]);
  for (const key of extra) if (Array.isArray(t[key])) out.push(t[key] as Token[]);
  return out;
}

export interface TreeOptions {
  /** Extra child fields to walk, as an extension's `childTokens` names them. */
  childFields?: readonly string[];
  /** Skip `space` tokens (blank lines), which crowd a card. */
  hideSpace?: boolean;
  /** Called with each drawn box, e.g. to tag it for highlighting. */
  onBox?: (box: HTMLElement, token: Token) => void;
}

function box(token: Token, opts: TreeOptions): HTMLElement {
  const el = document.createElement('div');
  el.className = 'mk-tok';
  el.style.setProperty('--hue', String(typeHue(token.type)));
  const head = document.createElement('div');
  head.className = 'mk-tok-head';
  const type = document.createElement('span');
  type.className = 'mk-tok-type';
  type.textContent = token.type;
  const text = document.createElement('span');
  text.className = 'mk-tok-text';
  text.textContent = preview(token);
  head.append(type, text);
  el.append(head);
  for (const list of childLists(token, opts.childFields)) {
    for (const child of list) {
      if (opts.hideSpace && child.type === 'space') continue;
      el.append(box(child, opts));
    }
  }
  opts.onBox?.(el, token);
  return el;
}

/** A pane that shows a token list as a tree; call `show(tokens)` after each lex. */
export function tokenTree(stage: Stage, label = 'Tokens'): { el: HTMLElement; show(tokens: Token[], opts?: TreeOptions): void } {
  const wrap = document.createElement('div');
  wrap.className = 'mk-pane mk-pane-tokens';
  const l = document.createElement('div');
  l.className = 'mk-label';
  l.textContent = label;
  const body = document.createElement('div');
  body.className = 'mk-tokens';
  wrap.append(l, body);
  return {
    el: wrap,
    show(tokens, opts = {}) {
      const hideSpace = opts.hideSpace ?? stage.preview;
      body.replaceChildren(...tokens.filter((t) => !(hideSpace && t.type === 'space')).map((t) => box(t, { ...opts, hideSpace })));
      if (stage.preview) body.scrollTop = body.scrollHeight;
    },
  };
}
