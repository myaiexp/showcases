// A colour and a length held in CSS variables are tweened; every rule that reads them follows
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  root.innerHTML = `
    <div class="card"><h4>Card</h4><p>Border, heading and pill read the same variable.</p><span class="pill">--tone</span></div>
    <div class="dots"><i></i><i></i><i></i></div>
    <pre class="readout"></pre>`;
  const readout = root.querySelector<HTMLElement>('.readout');
  el.append(root);

  const ctx = gsap.context(() => {
    gsap.set(root, { '--tone': '#00bae2', '--gap': '6px' });
    // CSS variables tween like any property: a colour, and a length (units written out, since a custom property has no default unit)
    gsap.to(root, {
      '--tone': '#f4a261',
      '--gap': '30px',
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      onUpdate() {
        if (readout) {
          readout.textContent = `--tone ${gsap.getProperty(root, '--tone')}\n--gap  ${gsap.getProperty(root, '--gap')}`;
        }
      },
    });
  }, el);

  return () => ctx.revert();
};

export default mount;
