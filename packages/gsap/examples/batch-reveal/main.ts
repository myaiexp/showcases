// ScrollTrigger.batch: cards entering a scroller together are revealed as one staggered batch
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const grid = document.createElement('div');
  grid.className = 'grid';
  const cards: HTMLElement[] = [];
  const faces: HTMLElement[] = [];
  for (let i = 0; i < 24; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    const face = document.createElement('div');
    face.className = 'face';
    face.textContent = String(i + 1);
    face.style.setProperty('--hue', String(i * 15));
    card.append(face);
    cards.push(card);
    faces.push(face);
    grid.append(card);
  }
  scroller.append(grid);
  el.append(scroller);

  const readout = document.createElement('p');
  readout.className = 'readout';
  let batches: ScrollTrigger[] = [];

  const ctx = gsap.context((self) => {
    self.add('build', (batchMax: number) => {
      for (const st of batches) st.kill();
      gsap.set(cards, { opacity: 0 });
      gsap.set(faces, { y: 40 });
      // One ScrollTrigger per card; callbacks arrive as Arrays of the cards that fired together.
      batches = ScrollTrigger.batch(cards, {
        scroller,
        start: 'top 92%',
        interval: 0.1,
        batchMax,
        onEnter: (batch) => {
          readout.textContent = `onEnter: batch of ${batch.length} (batchMax ${batchMax})`;
          // Reveal tweens are made outside the context (ignore) so they aren't recorded in ctx.data
          ctx.ignore(() => {
            gsap.to(batch, { opacity: 1, duration: 0.4, stagger: 0.12, overwrite: true });
            gsap.to(batch.map((c) => c.firstElementChild), { y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', overwrite: true });
          });
        },
        onLeaveBack: (batch) => {
          ctx.ignore(() => {
            gsap.set(batch, { opacity: 0, overwrite: true });
            gsap.set(batch.map((c) => c.firstElementChild), { y: 40, overwrite: true });
          });
        },
      });
    });
    self.build(preview ? 3 : 100);

    if (preview) {
      gsap.to(scroller, {
        scrollTo: { y: 'max' },
        duration: 6,
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
    label.textContent = 'batchMax ';
    const select = document.createElement('select');
    for (const v of ['100', '6', '3', '1']) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = v === '100' ? 'unlimited' : v;
      select.append(o);
    }
    select.addEventListener('change', () => {
      scroller.scrollTo({ top: 0 });
      ctx.build(Number(select.value));
    });
    label.append(select);
    bar.append(label);
    el.append(bar, readout);
    readout.textContent = 'Scroll the box and watch the cards arrive in staggered groups.';
  }

  return () => {
    ctx.revert();
    gsap.killTweensOf([...cards, ...faces]);
  };
};

export default mount;
