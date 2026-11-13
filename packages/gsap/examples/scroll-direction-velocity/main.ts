// ScrollTrigger onUpdate: read progress, direction and getVelocity() from a scrolling box
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const content = document.createElement('div');
  content.className = 'content';
  for (let i = 0; i < 12; i++) {
    const line = document.createElement('div');
    line.className = 'line';
    content.append(line);
  }
  scroller.append(content);

  const panel = document.createElement('div');
  panel.className = 'panel';
  const arrow = document.createElement('div');
  arrow.className = 'arrow';
  arrow.textContent = '▼';
  const meter = document.createElement('div');
  meter.className = 'meter';
  const meterFill = document.createElement('div');
  meterFill.className = 'meter-fill';
  meter.append(meterFill);
  const text = document.createElement('div');
  text.className = 'text';
  panel.append(arrow, meter, text);
  el.append(panel, scroller);

  const ctx = gsap.context(() => {
    const setFill = gsap.quickSetter(meterFill, 'scaleX');
    gsap.set(meterFill, { scaleX: 0, transformOrigin: 'left' });
    let lastDir = 1;
    const st = ScrollTrigger.create({
      scroller,
      trigger: content,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.direction !== lastDir) {
          lastDir = self.direction;
          gsap.to(arrow, { rotation: self.direction === 1 ? 0 : 180, duration: 0.3 });
        }
      },
    });
    // onUpdate only fires while scrolling, so the ticker keeps the velocity readout falling to 0.
    const readVelocity = (): void => {
      const v = st.getVelocity();
      setFill(Math.min(1, Math.abs(v) / 2500));
      text.textContent = preview
        ? `prog ${st.progress.toFixed(2)}  dir ${st.direction}  vel ${Math.round(v)}`
        : `progress ${st.progress.toFixed(2)}   direction ${st.direction}   velocity ${Math.round(v)} px/s`;
    };
    gsap.ticker.add(readVelocity);

    if (preview) {
      // Alternate fast and slow scrolls so direction flips and velocity rises and falls.
      gsap
        .timeline({ repeat: -1 })
        .to(scroller, { scrollTo: { y: 'max' }, duration: 1.2, ease: 'power2.inOut' })
        .to(scroller, { scrollTo: { y: 150 }, duration: 2.4, ease: 'sine.inOut' })
        .to(scroller, { scrollTo: { y: 0 }, duration: 0.8, ease: 'power3.in' });
    }
    return () => gsap.ticker.remove(readVelocity);
  }, el);

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Scroll the box up and down, slowly then fast. The arrow flips with self.direction and the meter follows self.getVelocity().';
    el.append(hint);
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
