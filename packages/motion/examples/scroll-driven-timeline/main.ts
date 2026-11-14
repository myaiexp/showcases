// A multi-step timeline scrubbed by the scroll position of a panel, via scroll(timeline, { container })
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="reader">
      <div class="scroller">
        <div class="track">
          <div class="stage">
            <div class="step s1">Design</div>
            <div class="step s2">Build</div>
            <div class="step s3">Launch</div>
            <div class="rocket"></div>
            <div class="meter"><i></i></div>
          </div>
        </div>
      </div>
    </div>`;
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const reading = !preview ? panel(el) : undefined;
  const percent = reading?.readout('scroll progress', '0%');

  const scope = scopeMotion(el, () => {
    // Three one-second steps. The whole timeline is spread over the panel's scroll length.
    const timeline = animate([
      ['.s1', { opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }, { duration: 1 }],
      ['.rocket', { y: [0, -50], rotate: [0, 20] }, { duration: 1, at: '<' }],
      ['.s2', { opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }, { duration: 1 }],
      ['.rocket', { x: 90, rotate: 70 }, { duration: 1, at: '<' }],
      ['.s3', { opacity: [0, 1], y: [20, 0] }, { duration: 1 }],
      ['.rocket', { y: 30, scale: 0.5, rotate: 160 }, { duration: 1, at: '<' }],
      ['.meter i', { scaleX: [0, 1] }, { duration: 3, ease: 'linear', at: 0 }],
    ]);
    scroll(timeline, { container: scroller });

    if (preview) {
      // A card has no wheel, so a single-value animate() writes scrollTop back and forth.
      const max = (): number => scroller.scrollHeight - scroller.clientHeight;
      animate(0, 1, {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        onUpdate: (v) => {
          scroller.scrollTop = v * max();
        },
      });
      return;
    }
    scroller.addEventListener('scroll', () => {
      percent?.(`${Math.round((scroller.scrollTop / (scroller.scrollHeight - scroller.clientHeight)) * 100)}%`);
    });
    hint(el, 'Scroll inside the panel. There is no clock: the timeline sits at whatever fraction of the panel you have scrolled, forwards or back.');
  });
  return () => {
    scope.cancel();
    reading?.dispose();
  };
};

export default mount;
