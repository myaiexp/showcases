// repeat(), repeatDelay() and yoyo() set on a built timeline, with iteration and totalDuration read back
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, check, h, slider } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const out = h('pre', 'readout', '', wrap);

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      repeat: preview ? -1 : 2,
      repeatDelay: 0.3,
      yoyo: preview,
      onUpdate: show,
      onComplete: show,
      onRepeat: show,
    });
    tl.to(box, { x: () => track.clientWidth - 36, duration: 1, ease: 'power2.inOut' }).to(box, {
      rotation: 180,
      scale: 0.6,
      duration: 0.6,
    });

    function show(): void {
      out.textContent =
        `repeat() ${tl.repeat()}  repeatDelay() ${tl.repeatDelay().toFixed(1)}  yoyo() ${tl.yoyo()}\n` +
        `iteration() ${tl.iteration()}  duration() ${tl.duration().toFixed(2)}  totalDuration() ${tl.totalDuration().toFixed(2)}\n` +
        `time() ${tl.time().toFixed(2)}  totalTime() ${tl.totalTime().toFixed(2)}`;
    }
    show();

    if (preview) return;
    const bar = h('div', 'bar', '', wrap);
    const restart = (): void => {
      tl.restart();
      show();
    };
    slider('repeat()', -1, 4, 1, 2, (v) => { tl.repeat(v); show(); }, bar);
    slider('repeatDelay()', 0, 1.5, 0.1, 0.3, (v) => { tl.repeatDelay(v); show(); }, bar);
    check('yoyo()', (on) => { tl.yoyo(on); show(); }, bar);
    btn('restart()', restart, bar);
    h(
      'p',
      'note',
      'repeat(-1) loops forever, so totalDuration() turns into a huge placeholder number. duration() ignores repeats while totalDuration() adds every cycle and every repeatDelay.',
      wrap,
    );
  }, el);

  return () => ctx.revert();
};

export default mount;
