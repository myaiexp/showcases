// How common each query word is in the collection, as bars of the docs' idf weight
import { bars } from './bars.ts';
import { wordsOf } from './token-marks.ts';

export interface IdfBars {
  el: HTMLElement;
  /** Draws one bar per word, from how many of `titles` contain it. Returns each word's weight. */
  show(terms: readonly string[], titles: readonly string[]): { df: number; idf: number }[];
}

/**
 * The docs' weight: idf = log(1 + (fieldCount - docFreq + 0.5) / (docFreq + 0.5)), where
 * docFreq is the number of records whose text holds the word (exactly, as a token).
 */
export function idfBars(parent: HTMLElement): IdfBars {
  const el = document.createElement('div');
  parent.append(el);
  return {
    el,
    show(terms, titles) {
      el.replaceChildren();
      const sets = titles.map((t) => new Set(wordsOf(t)));
      const weights = terms.map((t) => {
        const df = sets.filter((s) => s.has(t)).length;
        return { df, idf: Math.log(1 + (titles.length - df + 0.5) / (df + 0.5)) };
      });
      const chart = bars(el, terms, 'idf');
      weights.forEach((w, i) => chart.set(i, w.idf, `· in ${w.df} of ${titles.length}`));
      return weights;
    },
  };
}
