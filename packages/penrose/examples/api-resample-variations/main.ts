// resample() lays the same compiled trio out again from another variation's samples
import { compile, optimize, resample, showError, toSVG } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const trio = {
  domain: `type Point
predicate Near(Point p, Point q)`,
  substance: `Point a, b, c, d, e
Near(a, b)
Near(b, c)
Near(d, e)
AutoLabel All`,
  style: `canvas {
  width = 300
  height = 300
}
forall Point p {
  p.dot = Circle {
    r : 14
  }
  p.text = Equation {
    string : p.label
    fontSize : "22px"
    center : p.dot.center
    fillColor : rgba(1, 1, 1, 1)
  }
  layer p.text above p.dot
}
forall Point p; Point q {
  ensure disjoint(p.dot, q.dot, 20)
}
forall Point p; Point q
where Near(p, q) {
  p.link = Line {
    start : p.dot.center
    end : q.dot.center
    strokeWidth : 3
  }
  layer p.link below p.dot
  layer p.link below q.dot
  encourage norm(p.dot.center - q.dot.center) == 70
}`,
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const grid = document.createElement('div');
  grid.className = 'grid';
  stage.paper.append(grid);

  const compiled = await compile({ ...trio, variation: 'grid-0' });
  if (compiled.isErr()) {
    stage.fail(showError(compiled.error));
    return () => stage.dispose();
  }
  let batch = 0;
  const fill = async (): Promise<void> => {
    const cells: HTMLElement[] = [];
    for (let i = 0; i < 4; i++) {
      // The new seed goes into the state first: resample() reads state.variation.
      const variation = `grid-${batch * 4 + i}`;
      const solved = optimize(resample({ ...compiled.value, variation }));
      if (solved.isErr()) return stage.fail(solved.error);
      const svg = await toSVG(solved.value, async () => undefined, `${stage.namespace}-${variation}`);
      const cell = document.createElement('figure');
      const cap = document.createElement('figcaption');
      cap.textContent = variation;
      cell.append(svg, cap);
      cells.push(cell);
    }
    if (stage.disposed) return;
    grid.replaceChildren(...cells);
    batch = (batch + 1) % 3;
  };
  stage.button('Four more', () => void fill());
  await fill();
  if (stage.preview) stage.every(4000, () => void fill());
  return () => stage.dispose();
};

export default mount;
