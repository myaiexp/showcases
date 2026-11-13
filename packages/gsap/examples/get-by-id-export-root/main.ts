// exportRoot() freezes every running animation, getById() finds one by id, globalTimeline slows it all
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import './style.css';

// exportRoot() and globalTimeline act on the whole GSAP instance, which in the gallery page
// would include every other example's animations. The iframe has a GSAP of its own.
const PAGE_CSS = `
body { padding: 10px; }
.world { display: flex; gap: 12px; justify-content: center; height: 74px; align-items: center; }
.w { width: 44px; height: 44px; border-radius: 8px; background: var(--accent); }
.w.id { background: var(--orange, #f93); }
.popup { margin: 4px auto 0; width: 150px; padding: 10px 0; text-align: center; border-radius: 10px;
  background: var(--green); color: #111; font: 600 13px system-ui, sans-serif; opacity: 0; }
.status { text-align: center; margin-top: 8px; font: 12px var(--font-mono, monospace); color: var(--fg-1); }
`;

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: [], css: PAGE_CSS, signal });
  const { gsap, doc, iframe } = frame;
  iframe.classList.toggle('preview', preview);
  doc.body.innerHTML = `
    <div class="world"><div class="w id"></div><div class="w"></div><div class="w"></div><div class="w"></div></div>
    <div class="popup">popup</div>
    <div class="status"></div>`;
  const boxes = Array.from(doc.querySelectorAll<HTMLElement>('.w')) as [HTMLElement, HTMLElement, HTMLElement, HTMLElement];
  const popup = doc.querySelector<HTMLElement>('.popup') as HTMLElement;
  const status = doc.querySelector<HTMLElement>('.status') as HTMLElement;

  // The world: looping tweens. The first one carries an id so getById() can find it.
  gsap.to(boxes[0], { id: 'spin', rotation: 360, duration: 2, ease: 'none', repeat: -1 });
  gsap.to(boxes[1], { y: -22, duration: 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(boxes[2], { scale: 1.4, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(boxes[3], { x: 18, duration: 0.6, ease: 'power1.inOut', repeat: -1, yoyo: true });

  let exported: ReturnType<typeof gsap.exportRoot> | undefined;
  let popupTween: ReturnType<typeof gsap.to> | undefined;
  const freeze = (): void => {
    gsap.killTweensOf(popup);
    // Export once; everything running at that moment moves into the new timeline.
    exported ??= gsap.exportRoot();
    // Made after the export, so this tween is not part of the exported timeline.
    gsap.set(popup, { opacity: 1 });
    popupTween?.kill();
    popupTween = gsap.to(popup, { rotation: 360, duration: 1.2, ease: 'none', repeat: -1 });
    gsap.killTweensOf(exported);
    gsap.to(exported, { timeScale: 0, duration: 0.6 });
    status.textContent = 'exportRoot() timeScale -> 0, popup still plays';
  };
  const resume = (): void => {
    popupTween?.kill();
    gsap.set(popup, { opacity: 0, rotation: 0 });
    if (exported) {
      gsap.killTweensOf(exported);
      gsap.to(exported, { timeScale: 1, duration: 0.6 });
    }
    status.textContent = 'exported timeline timeScale -> 1';
  };
  status.textContent = 'running';

  let timer = 0;
  let controls: HTMLElement | undefined;
  let readPanel: (() => void) | undefined;
  if (preview) {
    let frozen = false;
    timer = window.setInterval(() => {
      frozen = !frozen;
      if (frozen) freeze();
      else resume();
    }, 2600);
  } else {
    controls = document.createElement('div');
    controls.className = 'controls';
    const mk = (label: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      controls?.append(b);
    };
    mk('exportRoot + freeze', freeze);
    mk('resume', resume);
    mk('getById("spin") pause / play', () => {
      const t = gsap.getById('spin');
      if (t) t.paused(!t.paused());
    });
    const rate = document.createElement('input');
    rate.type = 'range';
    rate.min = '0';
    rate.max = '3';
    rate.step = '0.1';
    rate.value = '1';
    rate.addEventListener('input', () => {
      gsap.globalTimeline.timeScale(Number(rate.value));
    });
    const rateLabel = document.createElement('label');
    rateLabel.append('globalTimeline.timeScale ', rate);
    controls.append(rateLabel);
    const panel = document.createElement('pre');
    panel.className = 'panel';
    readPanel = () => {
      const spin = gsap.getById('spin');
      panel.textContent =
        `getById("spin"): ${spin ? `found, progress ${spin.progress().toFixed(2)}, paused ${spin.paused()}` : 'undefined'}\n` +
        `globalTimeline.timeScale(): ${gsap.globalTimeline.timeScale().toFixed(2)}\n` +
        `exported timeline timeScale(): ${exported ? exported.timeScale().toFixed(2) : 'not exported yet'}`;
    };
    gsap.ticker.add(readPanel);
    el.append(controls, panel);
  }

  return () => {
    window.clearInterval(timer);
    if (readPanel) gsap.ticker.remove(readPanel);
    gsap.globalTimeline.clear();
    controls?.remove();
    el.querySelector('.panel')?.remove();
    iframe.remove();
  };
};

export default mount;
