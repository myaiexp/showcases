// ScrollTrigger toggleActions and toggleClass on cards in a scroller, with the four callbacks logged
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PRESETS = ['play none none none', 'play pause resume reset', 'play reverse play reverse', 'restart complete reverse reset'];

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const cards: HTMLElement[] = [];
  const count = preview ? 4 : 5;
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    const inner = document.createElement('div');
    inner.className = 'inner';
    inner.textContent = `Card ${i + 1}`;
    card.append(inner);
    cards.push(card);
    scroller.append(card);
  }
  el.append(scroller);

  const log = document.createElement('pre');
  log.className = 'log';
  const lines: string[] = [];
  const note = (text: string): void => {
    lines.unshift(text);
    lines.length = Math.min(lines.length, 4);
    log.textContent = lines.join('\n');
  };

  const ctx = gsap.context((self) => {
    self.add('build', (toggleActions: string) => {
      for (const st of ScrollTrigger.getAll()) {
        if (st.scroller === scroller) {
          st.animation?.revert();
          st.kill();
        }
      }
      cards.forEach((card, i) => {
        const inner = card.firstElementChild;
        const name = `card ${i + 1}`;
        gsap.from(inner, {
          x: -80,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions,
            toggleClass: 'active', // added to the trigger while it is between start and end
            onEnter: () => note(`${name} onEnter`),
            onLeave: () => note(`${name} onLeave`),
            onEnterBack: () => note(`${name} onEnterBack`),
            onLeaveBack: () => note(`${name} onLeaveBack`),
          },
        });
      });
    });
    self.build(preview ? PRESETS[2] : PRESETS[1]);

    if (preview) {
      gsap.to(scroller, {
        scrollTo: { y: 'max' },
        duration: 4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.3,
      });
    }
  }, el);

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const label = document.createElement('label');
    label.textContent = 'toggleActions ';
    const select = document.createElement('select');
    for (const p of PRESETS) {
      const o = document.createElement('option');
      o.value = p;
      o.textContent = p;
      select.append(o);
    }
    select.value = PRESETS[1] ?? '';
    select.addEventListener('change', () => ctx.build(select.value));
    label.append(select);
    bar.append(label);
    el.append(bar, log);
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
