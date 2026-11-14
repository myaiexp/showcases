// A random-walk price pushed into an open tip while a timer runs
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const STOCKS = [
  { symbol: 'ACME', price: 142.3 },
  { symbol: 'BOLT', price: 58.75 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover a symbol and watch the price in its tip.' });

  const timers = document.createElement('div');
  timers.className = 'timers';
  let running = 0;
  const drawTimers = (): void => {
    timers.textContent = `Update timers running: ${running}`;
  };
  drawTimers();

  const refs: HTMLElement[] = [];
  for (const stock of STOCKS) {
    const ref = document.createElement('div');
    ref.className = 'sym';
    ref.textContent = stock.symbol;
    ref.tabIndex = 0;
    stage.root.append(ref);
    refs.push(ref);

    let price = stock.price;
    const open = price;
    let timer = 0;
    const text = (): string => {
      const pct = ((price - open) / open) * 100;
      return `${stock.symbol}  ${'$'}${price.toFixed(2)}\n${pct >= 0 ? '▲' : '▼'} ${Math.abs(pct).toFixed(2)}% today`;
    };
    const stop = (): void => {
      if (!timer) return;
      clearInterval(timer);
      timer = 0;
      running -= 1;
      drawTimers();
    };
    stage.onDispose(stop);

    stage.own(
      tippy(ref, {
        content: text(),
        placement: 'right',
        appendTo: stage.root,
        // Start ticking when the tip opens, and push each new price in with setContent.
        onShow(instance) {
          instance.setContent(text());
          if (timer) return;
          running += 1;
          drawTimers();
          timer = window.setInterval(() => {
            price = Math.max(1, price + (Math.random() - 0.5) * 1.2);
            instance.setContent(text());
          }, 900);
        },
        // Stop once it has fully closed.
        onHidden: stop,
      }),
    );
  }
  stage.root.append(timers);

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(refs[0]!, 600);
      await wait(3600);
      stage.ghost.leave();
      await wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
