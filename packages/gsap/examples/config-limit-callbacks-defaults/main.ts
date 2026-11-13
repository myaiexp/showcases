// ScrollTrigger.config({ limitCallbacks }) and ScrollTrigger.defaults(), rebuilt on a box that starts scrolled
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Mount } from '@/types.ts';
import { check, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const CELLS = 10;
const START_SCROLL = 330; // as if the page was reloaded part-way down

// What ScrollTrigger uses when nothing is set, restored right after each build.
const DOCS_DEFAULTS = { toggleActions: 'play none none none', markers: false };

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const cells = Array.from({ length: CELLS }, (_, i) => h('div', 'cell', String(i + 1), scroller));
  const side = h('div', 'side', '', wrap);
  const out = h('pre', 'readout', '', side);

  let limit = false;
  let useDefaults = false;
  const fired = new Set<number>();
  const made: gsap.core.Tween[] = [];
  let timer = 0;

  const draw = (): void => {
    cells.forEach((c, i) => c.classList.toggle('fired', fired.has(i)));
    out.textContent =
      `config({ limitCallbacks: ${limit} })\n` +
      `defaults({ toggleActions }): ${useDefaults ? '"play none none reverse"' : 'not set'}\n` +
      `onEnter fired for ${fired.size} of ${CELLS} cells\n` +
      `(box starts scrolled ${START_SCROLL}px down)`;
  };

  const ctx = gsap.context(() => {
    const build = (): void => {
      for (const tw of made) tw.scrollTrigger?.kill();
      made.length = 0;
      fired.clear();
      scroller.scrollTop = START_SCROLL;

      // limitCallbacks is read on every update, so it stays set while this example is mounted.
      ScrollTrigger.config({ limitCallbacks: limit });
      // defaults() fills in anything a vars object leaves out. It is global, so set it only
      // around creation and put the documented values back straight away.
      if (useDefaults) ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
      cells.forEach((cell, i) => {
        made.push(
          gsap.from(cell, {
            x: -40,
            opacity: 0.2,
            // No toggleActions here: the default (or the defaults() value) applies.
            scrollTrigger: { scroller, trigger: cell, start: 'top 85%', end: 'bottom 15%', onEnter: () => { fired.add(i); draw(); } },
          }),
        );
      });
      ScrollTrigger.defaults(DOCS_DEFAULTS);
      draw();
    };
    build();

    if (preview) {
      timer = window.setInterval(() => {
        limit = !limit;
        useDefaults = !useDefaults;
        ctx.add(build);
      }, 2600);
    } else {
      check('limitCallbacks: true', (on) => { limit = on; ctx.add(build); }, side);
      check('defaults({ toggleActions: "play none none reverse" })', (on) => { useDefaults = on; ctx.add(build); }, side);
      h('p', 'note', 'Each box tween has no toggleActions of its own. Scroll up and down: with the defaults set, the tweens reverse on the way back. Toggle limitCallbacks and the box is rebuilt at the same scroll position to count the onEnter calls.', side);
    }
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
    ScrollTrigger.config({ limitCallbacks: false });
    ScrollTrigger.defaults(DOCS_DEFAULTS);
  };
};

export default mount;
