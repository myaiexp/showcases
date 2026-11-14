// Headless Tippy: the box is animated with element.animate and unmounted when it ends
import tippy from 'tippy.js/headless';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

type Style = 'pop' | 'slide' | 'flip';
const FRAMES: Record<Style, { enter: Keyframe[]; leave: Keyframe[] }> = {
  pop: {
    enter: [
      { opacity: 0, scale: '0.3', rotate: '-10deg' },
      { opacity: 1, scale: '1.12', rotate: '3deg', offset: 0.7 },
      { opacity: 1, scale: '1', rotate: '0deg' },
    ],
    leave: [
      { opacity: 1, translate: '0 0' },
      { opacity: 0, translate: '0 18px' },
    ],
  },
  slide: {
    enter: [
      { opacity: 0, translate: '-24px 0' },
      { opacity: 1, translate: '0 0' },
    ],
    leave: [
      { opacity: 1, translate: '0 0' },
      { opacity: 0, translate: '24px 0' },
    ],
  },
  flip: {
    enter: [
      { opacity: 0, transform: 'perspective(300px) rotateX(-90deg)' },
      { opacity: 1, transform: 'perspective(300px) rotateX(0deg)' },
    ],
    leave: [
      { opacity: 1, transform: 'perspective(300px) rotateX(0deg)' },
      { opacity: 0, transform: 'perspective(300px) rotateX(90deg)' },
    ],
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover or focus the heart, then pick another animation.' });
  let style: Style = 'pop';

  const heart = document.createElement('button');
  heart.className = 'heart';
  heart.setAttribute('aria-label', 'Add to favourites');
  heart.textContent = '♥';
  stage.root.append(heart);

  // The animation that is running on each tip's box, so a quick re-hover can cancel it.
  const running = new WeakMap<Element, Animation>();
  const boxOf = (popper: Element): HTMLElement => popper.firstElementChild as HTMLElement;
  const run = (box: HTMLElement, frames: Keyframe[], duration: number, easing: string): Animation => {
    running.get(box)?.cancel();
    const anim = box.animate(frames, { duration, easing, fill: 'both' });
    running.set(box, anim);
    return anim;
  };

  stage.own(
    tippy(heart, {
      content: 'Saved to your favourites',
      placement: 'right',
      // Headless tips are not animated unless you opt in; then you must unmount yourself.
      animation: true,
      appendTo: stage.root,
      render(instance) {
        const popper = document.createElement('div');
        const box = document.createElement('div');
        box.className = 'note';
        box.textContent = String(instance.props.content);
        popper.append(box);
        return { popper };
      },
      onShow(instance) {
        run(boxOf(instance.popper), FRAMES[style].enter, 420, 'cubic-bezier(.3,1.4,.5,1)');
      },
      onHide(instance) {
        const anim = run(boxOf(instance.popper), FRAMES[style].leave, 220, 'ease-in');
        anim.onfinish = () => {
          // Only unmount if it was not shown again while it was leaving.
          if (!instance.state.isVisible) instance.unmount();
        };
      },
    }),
  );

  if (stage.bar) select(stage.bar, 'Animation', ['pop', 'slide', 'flip'] as const, (v) => (style = v));

  if (stage.preview) {
    const order: Style[] = ['pop', 'slide', 'flip'];
    let n = 0;
    stage.play(async (wait) => {
      style = order[n++ % order.length]!;
      await stage.ghost.hover(heart, 700);
      await wait(1400);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 40, y: 160 }, 500);
      await wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
