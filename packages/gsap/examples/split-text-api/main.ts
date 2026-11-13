// SplitText instance API: split(), revert(), kill(), isSplit, the chars/words/lines/masks arrays, vars and autoSplit
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { btn, check, h, slider } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(SplitText);

const COPY = 'Split text into characters, words and lines, then take it apart again. Narrow the box and the lines reflow.';
type Kind = 'chars' | 'words' | 'lines';

const mount: Mount = (el, { preview }) => {
  const box = h('div', preview ? 'box small' : 'box', '', el);
  const text = h('p', 'text', COPY, box);
  const cap = h('p', 'cap', '', el);
  const info = preview ? undefined : h('pre', 'info', '', el);

  const types = new Set<Kind>(['words', 'lines']);
  let mask = false;
  let st: SplitText | undefined;
  const cleanups: Array<() => void> = [];

  const varsFor = (list: Kind[]): SplitText.Vars => ({
    type: [...list, ...(mask && !list.includes('lines') ? ['lines'] : [])].join(','),
    mask: mask ? 'lines' : undefined,
    charsClass: 'c',
    wordsClass: 'w',
    linesClass: 'l',
    autoSplit: true,
    // The animation returned from onSplit is kept in step with every re-split and reverted with it.
    onSplit(self) {
      const parts = self.chars.length ? self.chars : self.words.length ? self.words : self.lines;
      show();
      if (!parts.length) return;
      return gsap
        .timeline({ repeat: -1, repeatDelay: 1.5 })
        .from(parts, { opacity: 0.15, yPercent: mask ? 100 : 40, duration: 0.5, stagger: { each: self.chars.length ? 0.015 : 0.06 } });
    },
  });

  const show = (): void => {
    if (!st) return;
    const line = `chars ${st.chars.length}  words ${st.words.length}  lines ${st.lines.length}  masks ${st.masks.length}  isSplit ${st.isSplit}`;
    cap.textContent = line;
    if (info) info.textContent = `${line}\nvars: ${JSON.stringify((st as unknown as { vars: object }).vars) /* vars is documented but not in the typings */}`;
  };

  // SplitText is created outside gsap.context on purpose: split() re-enters the context every time
  // (so would each animation onSplit returns), and a card that re-splits on a timer would keep them all.
  // revert() undoes the split and the animation, and it is called on cleanup.
  st = SplitText.create(text, varsFor(preview ? ['chars'] : [...types]));
  show();

  let timer = 0;
  if (preview) {
    // walk through the instance methods: split by chars, words, lines, then revert()
    const phases: Array<() => void> = [
      () => st!.split(varsFor(['chars'])),
      () => st!.split(varsFor(['words'])),
      () => st!.split(varsFor(['lines'])),
      () => { st!.revert(); cap.textContent = `revert(): isSplit ${st!.isSplit}`; },
    ];
    let i = 0;
    timer = window.setInterval(() => phases[++i % phases.length]?.(), 2200);
  } else {
    box.style.width = '420px';
    const bar = h('div', 'controls', '', el);
    for (const k of ['chars', 'words', 'lines'] as Kind[]) {
      const c = check(k, (on) => { on ? types.add(k) : types.delete(k); }, bar);
      c.checked = types.has(k);
    }
    check('mask: "lines"', (on) => { mask = on; }, bar);
    const bar2 = h('div', 'controls', '', el);
    btn('split(vars)', () => { if (types.size || mask) st!.split(varsFor([...types])); }, bar2);
    btn('revert()', () => { st!.revert(); show(); }, bar2);
    btn('kill()', () => { st!.kill(); cap.textContent = 'kill(): autoSplit stopped, nothing reverted. Resize now: lines stay as they were.'; }, bar2);
    slider('width', 160, 440, 10, 420, (v) => { box.style.width = `${v}px`; }, bar2);
    h('p', 'note', 'Pick split types and press split(): the arrays fill. revert() restores the original text. kill() only stops the automatic re-split on resize; split() again turns it back on. Re-splitting is also how the width slider keeps lines correct (autoSplit).', el);
    // lines re-split by autoSplit are reported through onSplit; refresh the counts when the box resizes
    const ro = new ResizeObserver(() => window.setTimeout(show, 300));
    ro.observe(box);
    cleanups.push(() => ro.disconnect());
  }

  return () => {
    window.clearInterval(timer);
    for (const fn of cleanups) fn();
    // revert() also calls kill(): the text is restored, and the autoSplit listeners are gone
    st?.revert();
  };
};
export default mount;
