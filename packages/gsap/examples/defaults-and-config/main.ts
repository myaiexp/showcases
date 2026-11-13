// gsap.defaults() and gsap.config() change a whole GSAP instance, so they run in an iframe's own copy
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import './style.css';

// defaults() and config() are global: in the gallery page they would reshape every other
// example. The iframe has a GSAP of its own, so the change stays inside it.
const PAGE_CSS = `
body { padding: 10px 12px; }
.row { position: relative; height: 38px; margin: 0 0 10px; background: var(--bg-surface); border-radius: 6px; }
.box { position: absolute; top: 6px; left: 0; width: 26px; height: 26px; border-radius: 6px; background: var(--accent); }
.lab { position: absolute; right: 8px; top: 10px; font: 11px var(--font-mono, monospace); color: var(--fg-2); }
.lead { margin: 0 0 12px; font: 12px var(--font-mono, monospace); color: var(--fg-1); line-height: 1.6; }
.preview-mode .lead { display: none; }
`;

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: [], css: PAGE_CSS, signal });
  frame.iframe.classList.toggle('preview', preview);
  const { gsap, doc } = frame;
  doc.body.classList.toggle('preview-mode', preview);
  doc.body.innerHTML = `
    <p class="lead">gsap.config({ units: { left: "%" } })<br>
    gsap.defaults({ ease: "power2.in", duration: 1.2, repeat: -1, yoyo: true })</p>
    <div class="row"><div class="box b1"></div><span class="lab l1"></span></div>
    <div class="row"><div class="box b2"></div><span class="lab l2"></span></div>
    <div class="row"><div class="box b3"></div><span class="lab l3"></span></div>`;
  const q = (s: string): HTMLElement => doc.querySelector<HTMLElement>(s) as HTMLElement;

  // config: settings that are not tween-specific. A bare number for left now means percent.
  gsap.config({ units: { left: '%' }, nullTargetWarn: false });
  // defaults: inherited by every tween below unless it overrides them
  gsap.defaults({ ease: 'power2.in', duration: 1.2, repeat: -1, repeatDelay: 0.3, yoyo: true });

  const inherits = gsap.to(q('.b1'), { left: 90 });
  q('.l1').textContent = `defaults: ${inherits.duration()}s, power2.in`;

  const overrides = gsap.to(q('.b2'), { left: 90, ease: 'none' });
  q('.l2').textContent = `ease overridden: ${overrides.duration()}s, none`;

  // inherit:false skips the defaults: back to GSAP's own 0.5s and power1.out
  const standalone = gsap.to(q('.b3'), { left: 90, inherit: false, repeat: -1, repeatDelay: 0.3, yoyo: true });
  q('.l3').textContent = `inherit:false: ${standalone.duration()}s, power1.out`;

  // nullTargetWarn: false keeps this quiet in the console
  gsap.to('.nothing-matches-this', { x: 100 });

  return () => {
    gsap.globalTimeline.clear();
    frame.iframe.remove();
  };
};

export default mount;
