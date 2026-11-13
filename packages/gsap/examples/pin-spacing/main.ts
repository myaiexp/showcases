// ScrollTrigger pin inside a scrollable box, with pinSpacing switchable on and off
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const block = (cls: string, text: string): HTMLElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

const mount: Mount = (el, { preview }) => {
  const scroller = block('scroller', '');
  const zone = block('zone', '');
  const panel = block('panel', '');
  const fill = block('fill', '');
  panel.append(block('label', 'pinned panel'), fill);
  zone.append(panel);
  scroller.append(block('block intro', 'Scroll down'), zone, block('block outro', 'Content after the pin'));
  el.append(scroller);

  const readout = document.createElement('p');
  readout.className = 'readout';

  const ctx = gsap.context((self) => {
    // The trigger element is pinned while the scroller moves 300px; the fill bar inside it
    // is what animates (the pinned element itself is never animated).
    self.add('build', (pinSpacing: boolean) => {
      // kill(true) reverts the pin and its spacer before the new one is built.
      const old = ScrollTrigger.getById('pin-demo');
      old?.animation?.kill();
      old?.kill(true);
      gsap.set(fill, { scaleX: 0 });
      gsap.to(fill, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          id: 'pin-demo',
          scroller,
          trigger: zone,
          start: 'top top',
          end: '+=300',
          pin: true,
          pinSpacing,
          scrub: true,
        },
      });
      readout.textContent = `pinSpacing: ${String(pinSpacing)}. ${
        pinSpacing ? 'Padding pushes the outro down, so it follows the pin.' : 'No padding: the outro scrolls up underneath the pinned panel.'
      }`;
    });
    self.build(true);

    if (preview) {
      gsap.to(scroller, {
        scrollTo: { y: 'max' },
        duration: 4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.4,
      });
    }
  }, el);

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const label = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = true;
    box.addEventListener('change', () => {
      ctx.build(box.checked);
      ScrollTrigger.refresh();
    });
    label.append(box, ' pinSpacing');
    bar.append(label);
    el.append(bar, readout);
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
