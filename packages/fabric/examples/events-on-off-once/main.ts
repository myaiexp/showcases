// Events: on() disposer, once(), off() and the handler map
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { trio } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Click the canvas to fire mouse:down and mouse:up. The buttons attach and remove three listeners in the different ways the Observable API allows.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...trio().all);
  const say = status(stage);

  let disposeA: VoidFunction | null = null;
  let disposeOnce: VoidFunction | null = null;
  let disposeMap: VoidFunction | null = null;
  const n = { a: 0, once: 0, down: 0, up: 0 };
  const show = (): void => {
    say(
      [
        `on(down)       ${disposeA ? 'attached' : 'detached'} · fired ${n.a}`,
        `once(down)     ${disposeOnce ? 'armed   ' : 'spent   '} · fired ${n.once}`,
        `on({down, up}) ${disposeMap ? 'attached' : 'detached'} · ${n.down}/${n.up}`,
      ].join('\n'),
    );
  };

  // on() returns a function that removes exactly that listener
  const attachA = (): void => {
    disposeA ??= canvas.on('mouse:down', () => {
      n.a++;
      show();
    });
    show();
  };
  const detachA = (): void => {
    disposeA?.();
    disposeA = null;
    show();
  };
  // once() removes itself after the first call; its disposer works until then
  const armOnce = (): void => {
    disposeOnce?.();
    disposeOnce = canvas.once('mouse:down', () => {
      n.once++;
      disposeOnce = null;
      show();
    });
    show();
  };
  // an object of name → handler attaches several at once; one disposer removes them all
  const attachMap = (): void => {
    disposeMap ??= canvas.on({
      'mouse:down': () => {
        n.down++;
        show();
      },
      'mouse:up': () => {
        n.up++;
        show();
      },
    });
    show();
  };
  // off('name') removes every listener of that event, whoever added it
  const offDown = (): void => {
    canvas.off('mouse:down');
    disposeA = disposeOnce = null;
    show();
  };
  show();

  if (stage.bar) {
    button(stage.bar, 'on(down)', attachA);
    button(stage.bar, 'dispose it', detachA);
    button(stage.bar, 'once(down)', armOnce);
    button(stage.bar, 'on({down, up})', attachMap);
    button(stage.bar, "off('mouse:down')", offDown);
  } else {
    const ghost = stage.ghost(canvas);
    const steps: (() => void)[] = [attachA, armOnce, attachMap, detachA, offDown];
    stage.repeat(async () => {
      n.a = n.once = n.down = n.up = 0;
      disposeMap?.();
      disposeMap = null;
      offDown();
      for (const step of steps) {
        step();
        await ghost.click({ x: 180, y: 190 });
        await stage.wait(300);
      }
    }, 600);
  }

  return stage.dispose;
};

export default mount;
