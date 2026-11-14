// A toast entering with a CSS spring next to the ease-out fallback an old browser would get
import { delay, scopeMotion, spring } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="cols">
      <div class="col"><span class="cap">Spring</span><div class="toast spring-toast"><b>Saved</b><small>Changes synced</small></div><code class="css spring-css"></code></div>
      <div class="col"><span class="cap">Fallback</span><div class="toast fallback-toast"><b>Saved</b><small>Changes synced</small></div><code class="css fallback-css"></code></div>
    </div>
    <p class="support"></p>`;
  el.classList.toggle('is-full', !preview);
  const springToast = el.querySelector<HTMLElement>('.spring-toast')!;
  const fallbackToast = el.querySelector<HTMLElement>('.fallback-toast')!;
  const springCss = el.querySelector<HTMLElement>('.spring-css')!;
  const fallbackCss = el.querySelector<HTMLElement>('.fallback-css')!;
  // Browsers without linear() ignore a spring transition entirely: it would simply not animate.
  const ok = CSS.supports('transition-timing-function', 'linear(0, 1)');
  el.querySelector('.support')!.textContent = `This browser ${ok ? 'supports' : 'does not support'} linear() easing.`;

  let visual = 0.4;
  let bounce = 0.35;
  let shown = false;

  const setTransitions = (): void => {
    // Both timings share one visual duration, so they take the same time to first arrive.
    // The spring is allowed to overshoot (and keep settling after); opacity stays on a plain ease-out.
    const fallback = `transform ${visual}s ease-out, opacity ${visual}s ease-out`;
    const sprung = `opacity ${visual}s ease-out, transform ${spring(visual, bounce)}`;
    springToast.style.transition = sprung;
    fallbackToast.style.transition = fallback;
    springCss.textContent = `transition: opacity ${visual}s ease-out, transform ${String(spring(visual, bounce)).slice(0, 24)}…`;
    fallbackCss.textContent = `transition: ${fallback}`;
  };
  const toggle = (): void => {
    shown = !shown;
    setTransitions();
    for (const t of [springToast, fallbackToast]) {
      t.style.opacity = shown ? '1' : '0';
      t.style.transform = shown ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.9)';
    }
  };
  for (const t of [springToast, fallbackToast]) {
    t.style.opacity = '0';
    t.style.transform = 'translateY(36px) scale(0.9)';
  }
  setTransitions();

  const scope = scopeMotion(el, () => {
    if (preview) {
      const tick = (): void => {
        toggle();
        delay(tick, 1.7);
      };
      delay(tick, 0.5);
    } else {
      delay(toggle, 0.4);
    }
  });

  let ui: ReturnType<typeof panel> | undefined;
  if (!preview) {
    ui = panel(el);
    ui.button('Show / hide toast', toggle);
    ui.slider('visual duration', { min: 0.2, max: 1.5, step: 0.05, value: visual }, (v) => {
      visual = v;
      setTransitions();
    });
    ui.slider('spring bounce', { min: 0, max: 0.8, step: 0.05, value: bounce }, (v) => {
      bounce = v;
      setTransitions();
    });
    hint(el, 'Both toasts reach their spot together, because the spring is timed by visualDuration. The spring then settles with a wobble the fallback skips.');
  }

  return () => {
    scope.cancel();
    ui?.dispose();
  };
};

export default mount;
