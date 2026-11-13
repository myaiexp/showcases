// Draggable autoScroll: dragging near the edge of a scrollable box scrolls it, faster the closer you get
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { h, slider } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable);

const CW = 900;
const CH = 640;
const BOX = 44;

const mount: Mount = (el, { preview }) => {
  const scroller = h('div', preview ? 'scroller small' : 'scroller', '', el);
  const content = h('div', 'content', '', scroller);
  content.style.width = `${CW}px`;
  content.style.height = `${CH}px`;
  const box = h('div', 'box', 'drag', content);
  let readout: HTMLElement | undefined;
  let drag: Draggable | undefined;
  let onScroll: (() => void) | undefined;

  const make = (speed: number): void => {
    drag?.kill();
    drag = Draggable.create(box, {
      type: 'x,y',
      bounds: content,
      // 0 is off, 1 is normal speed, 2 is double. The scrolling starts within 40px of the box's edge.
      autoScroll: speed,
    })[0];
  };

  const driver = { p: 0 };
  const ctx = gsap.context(() => {
    if (preview) {
      // a plain number tweened forever; each frame writes the box position and the scroll offsets
      gsap.to(driver, {
        p: 1,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          const x = 10 + driver.p * (CW - BOX - 20);
          const y = 10 + driver.p * (CH - BOX - 20);
          box.style.transform = `translate(${x}px, ${y}px)`;
          scroller.scrollLeft = x - scroller.clientWidth / 2;
          scroller.scrollTop = y - scroller.clientHeight / 2;
        },
      });
    }
  }, el);

  if (!preview) {
    const bar = h('div', 'controls', '', el);
    slider('autoScroll', 0, 4, 0.5, 1.5, (v) => make(v), bar);
    readout = h('p', 'readout', '', el);
    onScroll = (): void => {
      readout!.textContent = `scrollLeft ${Math.round(scroller.scrollLeft)}, scrollTop ${Math.round(scroller.scrollTop)}`;
    };
    scroller.addEventListener('scroll', onScroll);
    onScroll();
    h('p', 'note', 'Drag the box toward any edge of the frame and hold it there: the frame scrolls, faster the closer to the edge. Set autoScroll to 0 and it stops.', el);
    make(1.5);
  }

  return () => {
    if (onScroll) scroller.removeEventListener('scroll', onScroll);
    drag?.kill();
    ctx.revert();
  };
};

export default mount;
