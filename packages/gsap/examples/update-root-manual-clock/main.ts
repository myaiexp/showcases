// GSAP's ticker is unhooked in an iframe and gsap.updateRoot() is fed by a custom clock
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import './style.css';

// Unhooking the ticker stops every animation in that GSAP instance, so this runs in an
// iframe's own copy and never touches the gallery's animations.
const PAGE_CSS = `
body { padding: 12px; }
.lane { position: relative; height: 40px; background: var(--bg-surface); border-radius: 8px; margin-bottom: 10px; }
.dot { position: absolute; left: 0; top: 7px; width: 26px; height: 26px; border-radius: 6px; background: var(--accent); }
.dot.two { background: var(--green); border-radius: 50%; }
.status { font: 12px var(--font-mono, monospace); color: var(--fg-1); text-align: center; }
`;

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: [], css: PAGE_CSS, signal });
  const { gsap, doc, iframe, win } = frame;
  iframe.classList.toggle('preview', preview);
  doc.body.innerHTML = `
    <div class="lane"><div class="dot"></div></div>
    <div class="lane"><div class="dot two"></div></div>
    <div class="status"></div>`;
  const dots = Array.from(doc.querySelectorAll<HTMLElement>('.dot')) as [HTMLElement, HTMLElement];
  const status = doc.querySelector<HTMLElement>('.status') as HTMLElement;
  const W = Math.max(60, (preview ? 250 : 500) - 80);

  // 1. unhook GSAP's own heartbeat; from now on nothing advances unless we call updateRoot()
  gsap.ticker.remove(gsap.updateRoot);
  // The root timeline keeps its current time. Remember it so our clock starts at zero.
  const t0 = gsap.globalTimeline.time();
  gsap.to(dots[0], { x: W, rotation: 180, duration: 4, ease: 'none', repeat: -1, yoyo: true });
  gsap.to(dots[1], { x: W, duration: 4, ease: 'power2.inOut', repeat: -1, yoyo: true });

  // 2. our own clock: a number of seconds that we choose to push into the root timeline
  let clock = 0;
  const setClock = (t: number): void => {
    clock = t;
    gsap.updateRoot(t0 + t);
    status.textContent = `gsap.updateRoot(${(t0 + t).toFixed(2)})  clock ${t.toFixed(2)}s`;
  };
  setClock(0);

  let running = preview;
  let rate = 1;
  let last = 0;
  let raf = 0;
  const tick = (now: number): void => {
    if (running && last) setClock(Math.max(0, clock + ((now - last) / 1000) * rate));
    last = now;
    scrub.value = String(clock % 8);
    raf = win.requestAnimationFrame(tick);
  };
  const scrub = document.createElement('input');
  scrub.type = 'range';
  scrub.min = '0';
  scrub.max = '8';
  scrub.step = '0.01';
  scrub.value = '0';
  raf = win.requestAnimationFrame(tick);

  let controls: HTMLElement | undefined;
  if (!preview) {
    controls = document.createElement('div');
    controls.className = 'controls';
    scrub.addEventListener('input', () => {
      running = false;
      play.textContent = 'Run clock';
      setClock(Number(scrub.value));
    });
    const play = document.createElement('button');
    play.className = 'btn';
    play.textContent = 'Run clock';
    play.addEventListener('click', () => {
      running = !running;
      play.textContent = running ? 'Stop clock' : 'Run clock';
    });
    const speed = document.createElement('input');
    speed.type = 'range';
    speed.min = '-2';
    speed.max = '3';
    speed.step = '0.1';
    speed.value = '1';
    speed.addEventListener('input', () => {
      rate = Number(speed.value);
    });
    const l1 = document.createElement('label');
    l1.append('scrub 0 to 8s ', scrub);
    const l2 = document.createElement('label');
    l2.append('clock rate ', speed);
    controls.append(play, l1, l2);
    el.append(controls);
  }

  return () => {
    win.cancelAnimationFrame(raf);
    gsap.globalTimeline.clear();
    controls?.remove();
    iframe.remove();
  };
};

export default mount;
