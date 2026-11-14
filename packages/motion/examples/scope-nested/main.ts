// A page scope with a header scope and a sidebar scope created inside it: cancelling the outer one cancels them all
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { MotionScope } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="site${preview ? '' : ' full'}">
      <div class="header region"><i class="logo"></i><span class="dots"><i></i><i></i><i></i></span><em class="tag"></em></div>
      <div class="body">
        <div class="side region"><span class="bars"><i></i><i></i><i></i><i></i></span><em class="tag"></em></div>
        <div class="main region"><div class="sweep"><i></i></div><em class="tag"></em></div>
      </div>
    </div>`;
  const tags = {
    page: el.querySelector<HTMLElement>('.main .tag')!,
    header: el.querySelector<HTMLElement>('.header .tag')!,
    side: el.querySelector<HTMLElement>('.side .tag')!,
  };
  let page: MotionScope;
  let header: MotionScope;
  let side: MotionScope;
  let p: ReturnType<typeof panel> | undefined;

  const show = (): void => {
    for (const [name, s] of [['page', page], ['header', header], ['side', side]] as const) {
      tags[name].textContent = `${name}: ${s.state}`;
      tags[name].parentElement!.dataset.state = s.state;
    }
  };

  const build = (): void => {
    page = scopeMotion(el, () => {
      animate('.sweep i', { x: ['-100%', '250%'] }, { duration: 1.6, repeat: Infinity, ease: 'easeInOut' });
      // Created inside the page scope, so they belong to it. Selectors resolve inside the page root.
      header = scopeMotion('.header', () => {
        animate('.logo', { rotate: 360 }, { duration: 2, repeat: Infinity, ease: 'linear' });
        animate('.dots i', { y: [0, -6, 0] }, { duration: 0.8, repeat: Infinity, delay: stagger(0.15) });
      });
      side = scopeMotion('.side', () => {
        animate('.bars i', { scaleY: [0.3, 1] }, { duration: 0.7, repeat: Infinity, repeatType: 'reverse', delay: stagger(0.12), ease: 'easeInOut' });
      });
    });
    show();
  };

  const driver = scopeMotion(el, () => {
    if (!preview) return;
    const loop = (): void => {
      build();
      delay(() => { header.cancel(); show(); }, 2);
      delay(() => { page.cancel(); show(); }, 4);
      delay(loop, 6);
    };
    loop();
  });

  if (!preview) {
    build();
    hint(el, 'Cancel the header on its own and only the header stops. Cancel the page and the header and sidebar go with it, because scopes created inside a scope belong to it.');
    p = panel(el);
    p.button('Cancel header scope', () => { header.cancel(); show(); });
    p.button('Cancel sidebar scope', () => { side.cancel(); show(); });
    p.button('Cancel page scope', () => { page.cancel(); show(); });
    p.button('Restart', () => { page.cancel(); build(); });
  }

  return () => { driver.cancel(); page.cancel(); p?.dispose(); };
};

export default mount;
