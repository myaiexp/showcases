// Synthetic pointer for L7 cards: hover via mousemove, clicks via pointer events
import type { Scene } from '@antv/l7';

export interface Ghost {
  /** Moves the pointer to (x, y) px in the map box: L7 hover and mousemove events fire. */
  move(x: number, y: number): void;
  /** Moves the pointer to the screen point of a [lng, lat]. */
  moveTo(lngLat: [number, number]): void;
  /**
   * Taps at the current point: L7 click events fire (via its Hammer recogniser). The press
   * lasts 80 ms. Don't move in the same tick: L7 drops a pick while another one is running.
   */
  click(): void;
  /** Two taps and a DOM dblclick: L7's dblclick and the map engine's dblclick fire. */
  dblclick(): void;
  /**
   * Presses at the first point, moves through the rest every stepMs and releases at the last:
   * L7's dragstart/dragging/dragend fire, and the map engine pans unless dragging is disabled.
   * Resolves once released.
   */
  drag(path: readonly (readonly [number, number])[], stepMs?: number): Promise<void>;
  /** Leaves the map: hover highlights clear. */
  leave(): void;
  remove(): void;
}

/**
 * L7's InteractionService listens for mousemove on the map container (hover, mousemove,
 * mouseenter/out) and recognises taps with Hammer from pointer events, so a click is a
 * pointerdown and pointerup at the same point; the map engine's scene click listens for the
 * DOM click, which is sent too (stage.ghost() cancels untrusted clicks so the card's <a>
 * never navigates). A dot shows where the ghost is.
 */
export function createGhost(container: HTMLElement, scene: Scene, visible: boolean): Ghost {
  let x = 0;
  let y = 0;
  const pending = new Set<ReturnType<typeof setTimeout>>();
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:absolute;z-index:5;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;' +
    'border:2px solid #fff;background:rgba(255,255,255,.35);pointer-events:none;opacity:0;transition:opacity .2s';
  if (visible) container.append(dot);

  // Real pointer events land on the map engine's canvas container and bubble to the map div.
  const target = (): Element => container.querySelector('.l7-canvas-container') ?? container;
  const client = (): { clientX: number; clientY: number } => {
    const r = container.getBoundingClientRect();
    return { clientX: r.left + x, clientY: r.top + y };
  };
  const mouse = (type: string, init: MouseEventInit = {}): void => {
    target().dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, ...client(), ...init }));
  };
  const pointer = (type: string, buttons: number): void => {
    target().dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId: 91,
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
        buttons,
        ...client(),
      }),
    );
  };

  return {
    move(nx, ny) {
      x = nx;
      y = ny;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.opacity = '1';
      mouse('mousemove');
    },
    moveTo(lngLat) {
      const p = scene.lngLatToContainer(lngLat);
      this.move(p.x, p.y);
    },
    click() {
      pointer('pointerdown', 1);
      mouse('mousedown', { buttons: 1 });
      const up = setTimeout(() => {
        pending.delete(up);
        pointer('pointerup', 0);
        mouse('mouseup');
        // The map engine's own click (scene.on('click')) listens for the DOM event; the
        // stage cancels its default so the card's <a> doesn't navigate.
        mouse('click');
      }, 80);
      pending.add(up);
      dot.animate([{ transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 300 });
    },
    dblclick() {
      this.click();
      const second = setTimeout(() => {
        pending.delete(second);
        this.click();
        const dbl = setTimeout(() => {
          pending.delete(dbl);
          mouse('dblclick');
        }, 100);
        pending.add(dbl);
      }, 150);
      pending.add(second);
    },
    async drag(path, stepMs = 40) {
      const [first, ...rest] = path;
      if (!first) return;
      this.move(first[0], first[1]);
      pointer('pointerdown', 1);
      mouse('mousedown', { buttons: 1 });
      for (const [nx, ny] of rest) {
        await new Promise<void>((resolve) => {
          const t = setTimeout(() => {
            pending.delete(t);
            resolve();
          }, stepMs);
          pending.add(t);
        });
        x = nx;
        y = ny;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        pointer('pointermove', 1);
        mouse('mousemove', { buttons: 1 });
      }
      pointer('pointerup', 0);
      mouse('mouseup');
    },
    leave() {
      dot.style.opacity = '0';
      x = -50;
      y = -50;
      mouse('mousemove');
      mouse('mouseout');
    },
    remove() {
      for (const t of pending) clearTimeout(t);
      pending.clear();
      dot.remove();
    },
  };
}
