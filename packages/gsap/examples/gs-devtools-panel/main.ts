// GSDevTools: a playback panel mounted inside the example and linked to one timeline with ids on its tweens
import { gsap } from 'gsap';
import { GSDevTools } from 'gsap/GSDevTools';
import { h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(GSDevTools);

const mount: Mount = (el, { preview }) => {
  // The stage is the GSDevTools container: the panel is placed at its bottom edge.
  const stage = h('div', preview ? 'stage small' : 'stage');
  const field = h('div', 'field', '', stage);
  const orange = h('div', 'box orange', '', field);
  const green = h('div', 'box green', '', field);
  const grey = h('div', 'box grey', '', field);
  el.append(stage);
  if (!preview) {
    h('p', 'note', 'Drag the scrubber or the in/out markers, change the speed, or pick a single tween from the menu (each has an id). Space, arrows, L, I, O and H work as shortcuts while this example is open.', el);
  }

  const dist = (): number => Math.max(40, field.clientWidth - 70);

  const ctx = gsap.context(() => {
    // Ids make each animation selectable in the panel's menu.
    const tl = gsap.timeline({ id: 'timeline', repeat: preview ? -1 : 0, repeatDelay: 0.5 });
    tl.to(orange, { x: dist(), duration: 1, id: 'orange' })
      .to(green, { x: dist(), duration: 1.5, ease: 'bounce', id: 'green' })
      .to(grey, { x: dist(), rotation: 360, duration: 1, id: 'grey' }, '-=0.5');

    if (!preview) {
      GSDevTools.create({
        animation: tl,
        container: stage,
        persist: false, // do not remember in/out points between visits
        globalSync: false, // control only this timeline, not the whole global timeline
        id: 'showcase-devtools',
        loop: true,
      });
    }
  }, el);

  return () => {
    // GSDevTools.create() registers with the active context and its revert() is kill(), so
    // ctx.revert() removes the panel and its keyboard listener. Calling kill() as well throws,
    // because the second call finds the panel already detached.
    ctx.revert();
  };
};

export default mount;
