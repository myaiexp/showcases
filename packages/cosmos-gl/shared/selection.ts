// A drawn rectangle or lasso over the graph, dragged or scripted
import type { Stage } from './stage.ts';

export type Path = [number, number][];

export interface Selection {
  /** Draws `path` (two corners for a rectangle, the outline for a lasso) and reports it. */
  set(path: Path | null): void;
}

const NS = 'http://www.w3.org/2000/svg';

/**
 * Puts an SVG layer over `stage.div`. In a full view dragging on it draws the shape and calls
 * `onChange` with the path in px from the graph box's top-left; cards call `set` themselves.
 */
export function selection(stage: Stage, kind: 'rect' | 'lasso', onChange: (path: Path | null) => void): Selection {
  const svg = document.createElementNS(NS, 'svg');
  svg.style.cssText = `position:absolute;inset:0;width:100%;height:100%;z-index:3;touch-action:none;${stage.preview ? 'pointer-events:none' : 'cursor:crosshair'}`;
  const shape = document.createElementNS(NS, kind === 'rect' ? 'rect' : 'polygon');
  shape.setAttribute('fill', 'rgb(255 216 77 / 0.12)');
  shape.setAttribute('stroke', '#ffd84d');
  shape.setAttribute('stroke-width', '1.5');
  shape.setAttribute('stroke-dasharray', '5 3');
  shape.style.display = 'none';
  svg.append(shape);
  stage.div.append(svg);
  stage.onDispose(() => svg.remove());

  const set = (path: Path | null): void => {
    if (!path || path.length < 2) {
      shape.style.display = 'none';
      onChange(null);
      return;
    }
    shape.style.display = '';
    if (kind === 'rect') {
      const [a, b] = path as [[number, number], [number, number]];
      shape.setAttribute('x', String(Math.min(a[0], b[0])));
      shape.setAttribute('y', String(Math.min(a[1], b[1])));
      shape.setAttribute('width', String(Math.abs(a[0] - b[0])));
      shape.setAttribute('height', String(Math.abs(a[1] - b[1])));
    } else {
      shape.setAttribute('points', path.map(([x, y]) => `${x},${y}`).join(' '));
    }
    onChange(path);
  };

  if (!stage.preview) {
    let drawing: Path | null = null;
    const at = (e: PointerEvent): [number, number] => {
      const r = svg.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const { signal } = stage;
    svg.addEventListener(
      'pointerdown',
      (e) => {
        svg.setPointerCapture(e.pointerId);
        const p = at(e);
        drawing = [p, p];
        set(drawing);
      },
      { signal },
    );
    svg.addEventListener(
      'pointermove',
      (e) => {
        if (!drawing) return;
        const p = at(e);
        if (kind === 'rect') drawing = [drawing[0] ?? p, p];
        else {
          const last = drawing[drawing.length - 1] ?? p;
          if (Math.hypot(p[0] - last[0], p[1] - last[1]) < 5) return;
          drawing = [...drawing, p];
        }
        set(drawing);
      },
      { signal },
    );
    const end = (): void => {
      drawing = null;
    };
    svg.addEventListener('pointerup', end, { signal });
    svg.addEventListener('pointercancel', end, { signal });
  }
  return { set };
}
