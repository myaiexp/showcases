// Ranked result rows that slide to their new place, with a score bar (0 = perfect)

export interface Row {
  /** Stable identity across searches, usually the result's refIndex. */
  id: string | number;
  /** Main line: plain text, or nodes from highlight(). */
  title: Node[] | string;
  /** Optional second line. */
  sub?: Node[] | string;
  /** Fuse score, 0 (perfect) to 1 (no match). Drawn as a bar when the list shows scores. */
  score?: number;
  /** Small label at the right, e.g. "title" or "$12". */
  badge?: string;
  tone?: 'dim' | 'ok' | 'bad';
}

export interface ResultList {
  el: HTMLElement;
  /** Replaces the rows. Rows that stay slide to their new place; new rows fade in. */
  show(rows: readonly Row[], emptyText?: string): void;
}

export interface ResultListOptions {
  /** Most rows shown; the rest are summed up as "+N more". */
  max?: number;
  /** Draw each row's score bar. Default true. */
  scores?: boolean;
  /** Number the rows 1, 2, 3 so the ranking is visible. Default true. */
  ranks?: boolean;
  /** Text when there are no rows. */
  empty?: string;
}

/** Green at 0 (perfect) through amber to red at 1 (no match). */
export function scoreColor(score: number): string {
  const s = Math.min(1, Math.max(0, score));
  return `hsl(${Math.round(130 - 130 * s)} 65% 50%)`;
}

/** A thin bar that is full for a perfect match and empty for none, plus the number. */
export function scoreBar(score: number): HTMLElement {
  const wrap = document.createElement('span');
  wrap.className = 'fz-score';
  wrap.title = `score ${score.toFixed(3)} (0 = perfect, 1 = no match)`;
  const track = document.createElement('span');
  track.className = 'fz-score-track';
  const fill = document.createElement('span');
  fill.className = 'fz-score-fill';
  fill.style.width = `${Math.max(4, (1 - score) * 100)}%`;
  fill.style.background = scoreColor(score);
  track.append(fill);
  const num = document.createElement('span');
  num.className = 'fz-score-num';
  num.textContent = score < 0.005 && score > 0 ? '≈0' : score.toFixed(2);
  wrap.append(track, num);
  return wrap;
}

function fill(el: HTMLElement, nodes: Node[] | string): void {
  if (typeof nodes === 'string') el.textContent = nodes;
  else el.replaceChildren(...nodes);
}

export function resultList(parent: HTMLElement, opts: ResultListOptions = {}): ResultList {
  const el = document.createElement('ol');
  el.className = 'fz-results';
  parent.append(el);
  const showScores = opts.scores ?? true;
  const showRanks = opts.ranks ?? true;
  let byId = new Map<string | number, HTMLElement>();

  const build = (row: Row, rank: number, li: HTMLElement): void => {
    li.className = row.tone ? `fz-row fz-${row.tone}` : 'fz-row';
    const parts: HTMLElement[] = [];
    if (showRanks) {
      const r = document.createElement('span');
      r.className = 'fz-rank';
      r.textContent = String(rank);
      parts.push(r);
    }
    const text = document.createElement('span');
    text.className = 'fz-text';
    const title = document.createElement('span');
    title.className = 'fz-title';
    fill(title, row.title);
    text.append(title);
    if (row.sub !== undefined) {
      const sub = document.createElement('span');
      sub.className = 'fz-sub';
      fill(sub, row.sub);
      text.append(sub);
    }
    parts.push(text);
    if (row.badge) {
      const b = document.createElement('span');
      b.className = 'fz-badge';
      b.textContent = row.badge;
      parts.push(b);
    }
    if (showScores && row.score !== undefined) parts.push(scoreBar(row.score));
    li.replaceChildren(...parts);
  };

  return {
    el,
    show(rows, emptyText) {
      const before = new Map<string | number, number>();
      for (const [id, li] of byId) before.set(id, li.getBoundingClientRect().top);
      const next = new Map<string | number, HTMLElement>();
      const max = opts.max ?? rows.length;
      const items: HTMLElement[] = [];
      rows.slice(0, max).forEach((row, i) => {
        const li = byId.get(row.id) ?? document.createElement('li');
        build(row, i + 1, li);
        next.set(row.id, li);
        items.push(li);
      });
      if (rows.length > max) {
        const more = document.createElement('li');
        more.className = 'fz-more';
        more.textContent = `+${rows.length - max} more`;
        items.push(more);
      }
      if (rows.length === 0) {
        const none = document.createElement('li');
        none.className = 'fz-none';
        none.textContent = emptyText ?? opts.empty ?? 'No matches';
        items.push(none);
      }
      el.replaceChildren(...items);
      byId = next;
      // FLIP: rows that were already shown slide from their old place; new ones fade in.
      for (const [id, li] of next) {
        const old = before.get(id);
        if (old === undefined) {
          li.animate([{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
          continue;
        }
        const dy = old - li.getBoundingClientRect().top;
        if (Math.abs(dy) > 1) li.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 280, easing: 'ease-out' });
      }
    },
  };
}
