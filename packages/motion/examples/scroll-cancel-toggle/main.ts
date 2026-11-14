// A sticky header that shrinks as you scroll, and a switch that cancels and re-attaches it with scroll()'s returned function
import { animate, delay, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="site">
      <div class="scroller">
        <header class="head"><div class="bar"><i class="logo"></i><b class="name">Harbour &amp; Co.</b><span class="status"></span></div></header>
        <div class="body"></div>
      </div>
    </div>`;
  el.querySelector('.site')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const status = el.querySelector<HTMLElement>('.status')!;
  const body = el.querySelector<HTMLElement>('.body')!;
  for (let i = 1; i <= 8; i++) {
    const block = document.createElement('div');
    block.className = 'block';
    block.style.background = `hsl(${i * 40} 40% 28%)`;
    body.append(block);
  }

  let cancel: VoidFunction | undefined;
  const attach = (): void => {
    // A new animation each time: the old one was cancelled with the scroll() that drove it.
    const shrink = animate('.bar', { height: [76, 40], backgroundColor: ['rgba(30,30,44,0)', 'rgba(30,30,44,0.96)'] }, { ease: 'linear' });
    const logo = animate('.logo', { scale: [1.4, 0.8] }, { ease: 'linear' });
    const name = animate('.name', { fontSize: ['1.2rem', '0.85rem'] }, { ease: 'linear' });
    // Offset: from the very top (scroll 0) to 100px scrolled.
    const range = { container: scroller, offset: ['start start', '100px start'] as ['start start', '100px start'] };
    const stops = [scroll(shrink, range), scroll(logo, range), scroll(name, range)];
    cancel = () => stops.forEach((stop) => stop());
    status.textContent = 'scroll() on';
  };
  const detach = (): void => {
    cancel?.(); // the function scroll() returned
    cancel = undefined;
    status.textContent = 'cancelled';
  };

  let controls: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, () => {
    attach();
    if (preview) {
      autoScroll(scroller, { duration: 3.5 });
      // Flip between attached and cancelled every few seconds.
      const flip = (): void => {
        if (cancel) detach();
        else attach();
        delay(flip, 4);
      };
      delay(flip, 4);
    }
  });

  if (!preview) {
    controls = panel(el);
    const button = controls.button('Cancel scroll()', () => {
      if (cancel) {
        detach();
        button.textContent = 'Attach scroll() again';
      } else {
        scope.run(attach);
        button.textContent = 'Cancel scroll()';
      }
    });
    hint(el, 'Scroll the page: the header shrinks over the first 100 px. Press Cancel and scroll again: nothing follows, because the function scroll() returned has detached the animation. Attach it again and the header picks up from your scroll position.');
  }

  return () => {
    cancel?.();
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
