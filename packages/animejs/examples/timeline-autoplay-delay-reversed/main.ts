// Timeline autoplay, delay and reversed: pick the settings, build a timeline, watch its state
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

interface Settings {
  autoplay: boolean;
  delay: number;
  reversed: boolean;
}

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let tl: ReturnType<typeof createTimeline> | undefined;
  const settings: Settings = { autoplay: true, delay: 0, reversed: false };

  const setPaused = preview ? () => {} : sc.readout(sc.panel(), 'paused', '-');
  const setTime = preview ? () => {} : sc.readout(sc.panel(), 'currentTime', '-');
  const setRev = preview ? () => {} : sc.readout(sc.panel(), 'reversed', '-');
  const caption = document.createElement('div');
  caption.className = 'caption';
  el.append(caption);

  const build = (s: Settings): void => {
    tl?.revert();
    caption.textContent = `autoplay: ${s.autoplay}, delay: ${s.delay}, reversed: ${s.reversed}`;
    tl = createTimeline({ autoplay: s.autoplay, delay: s.delay, reversed: s.reversed })
      .add(sc.circle, { x: '10rem' })
      .add(sc.triangle, { x: '10rem' }, '-=500')
      .add(sc.square, { x: '10rem' }, '-=500');
  };

  if (preview) {
    const presets: Settings[] = [
      { autoplay: true, delay: 0, reversed: false },
      { autoplay: true, delay: 1500, reversed: false },
      { autoplay: false, delay: 0, reversed: false },
      { autoplay: true, delay: 0, reversed: true },
    ];
    let i = 0;
    const cycle = (): void => {
      const s = presets[i++ % presets.length]!;
      build(s);
      // autoplay: false waits for a manual play()
      if (!s.autoplay) sc.later(() => tl?.play(), 1500);
    };
    cycle();
    sc.every(cycle, 4200);
  } else {
    const p = sc.panel();
    const autoBtn = sc.button(p, '', () => {
      settings.autoplay = !settings.autoplay;
      label();
    });
    const delayBtn = sc.button(p, '', () => {
      settings.delay = settings.delay ? 0 : 2000;
      label();
    });
    const revBtn = sc.button(p, '', () => {
      settings.reversed = !settings.reversed;
      label();
    });
    const label = (): void => {
      autoBtn.textContent = `autoplay: ${settings.autoplay}`;
      delayBtn.textContent = `delay: ${settings.delay}`;
      revBtn.textContent = `reversed: ${settings.reversed}`;
    };
    label();
    const q = sc.panel();
    sc.button(q, 'Create timeline', () => build(settings));
    sc.button(q, 'play()', () => tl?.play());
    build(settings);
    sc.every(() => {
      if (!tl) return;
      setPaused(String(tl.paused));
      setTime(Math.round(tl.currentTime));
      setRev(String(tl.reversed));
    }, 80);
  }

  return () => {
    sc.dispose();
    tl?.revert();
  };
};

export default mount;
