// A spinning CSS cube and the forced-flattening trap: opacity, overflow or filter on a preserve-3d parent flatten it
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// Each of these is a "grouping property value": the browser must flatten the cube to draw it.
const TRAPS = {
  none: {},
  'opacity: 0.95': { opacity: '0.95' },
  'overflow: hidden': { overflow: 'hidden' },
  'filter: brightness(1)': { filter: 'brightness(1)' },
  'isolation: isolate': { isolation: 'isolate' },
} as const;
type Trap = keyof typeof TRAPS;
const RESET = { opacity: '', overflow: '', filter: '', isolation: '' };

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="scene">
      <div class="cube">
        <div class="face f1">1</div><div class="face f2">2</div><div class="face f3">3</div>
        <div class="face f4">4</div><div class="face f5">5</div><div class="face f6">6</div>
      </div>
    </div>
    <span class="state"></span>`;
  el.classList.toggle('is-full', !preview);
  const cube = el.querySelector<HTMLElement>('.cube')!;
  const scene = el.querySelector<HTMLElement>('.scene')!;
  const state = el.querySelector<HTMLElement>('.state')!;

  const flatten = (trap: Trap): void => {
    Object.assign(cube.style, RESET, TRAPS[trap]);
    state.textContent = trap === 'none' ? 'transform-style: preserve-3d (3D)' : `${trap} on the cube: flattened`;
    state.classList.toggle('flat', trap !== 'none');
  };
  flatten('none');

  let ui: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, () => {
    // Motion keeps each rotation as its own value, so one looping tween turns the cube about y
    // while rotateX holds the tilt.
    animate(cube, { rotateX: -24 }, { duration: 0 });
    animate(cube, { rotateY: [0, 360] }, { duration: 9, ease: 'linear', repeat: Infinity });

    if (preview) {
      const tick = (): void => {
        flatten('opacity: 0.95');
        delay(() => flatten('none'), 1.6);
        delay(tick, 3.6);
      };
      delay(tick, 1.4);
    }
  });

  if (!preview) {
    ui = panel(el);
    ui.select('apply to the cube', Object.keys(TRAPS) as Trap[], 'none', flatten);
    ui.slider('perspective', { min: 250, max: 1600, step: 10, value: 700 }, (v) => (scene.style.perspective = `${v}px`));
    ui.button('Fade the cube in', () => {
      flatten('none');
      // opacity < 1 on the cube is the sneaky one: it stays flat all through the fade, then pops into depth at 1.
      animate(cube, { opacity: [0, 1] }, { duration: 2 });
    });
    hint(el, 'Pick a property from the list and the cube collapses into a flat picture, faces drawn on top of each other. "Fade the cube in" shows the pop into 3D when opacity finally reaches 1.');
  }

  return () => {
    scope.cancel();
    ui?.dispose();
  };
};

export default mount;
