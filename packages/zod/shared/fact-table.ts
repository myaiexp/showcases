// Core kit: label and text rows, arriving one by one in cards
import './fact-table.css';
import type { Stage } from './stage.ts';

export interface Fact {
  label: string;
  /** Small words under the label. */
  sub?: string;
  text: string;
  tone?: 'ok' | 'bad';
}

/** `cardLabel`: width of the label column in a card (CSS length). */
export interface FactTable {
  el: HTMLElement;
  /** Replaces the rows. In a card they arrive one at a time. */
  show(facts: readonly Fact[]): void;
}

export function factTable(parent: HTMLElement, stage: Stage, cardLabel = '10em'): FactTable {
  const el = document.createElement('div');
  el.className = 'zd-facts';
  // The label column in a card: as wide as the longest label there needs, no more.
  el.style.setProperty('--zd-label', cardLabel);
  parent.append(el);
  let gen = 0;
  const build = (fact: Fact): HTMLElement => {
    const row = document.createElement('div');
    row.className = 'zd-fact';
    if (fact.tone) row.dataset['tone'] = fact.tone;
    const label = document.createElement('b');
    label.textContent = fact.label;
    if (fact.sub) {
      const sub = document.createElement('small');
      sub.textContent = fact.sub;
      label.append(sub);
    }
    const text = document.createElement('span');
    text.textContent = fact.text;
    text.dir = 'auto';
    row.append(label, text);
    return row;
  };
  return {
    el,
    show(facts) {
      const mine = ++gen;
      el.replaceChildren();
      facts.forEach((fact, i) => {
        const add = (): void => {
          if (mine !== gen) return;
          const row = build(fact);
          el.append(row);
          if (!stage.disposed) row.animate([{ opacity: 0, transform: 'translateX(-5px)' }, { opacity: 1, transform: 'none' }], { duration: 220 });
        };
        if (stage.preview) stage.after(i * 340, add);
        else add();
      });
    },
  };
}
