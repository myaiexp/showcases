// The compiled state is a random first sample; optimize turns it into a layout
import { compile, isOptimized, optimize, showError, toSVG } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const trio = {
  domain: `type Set
predicate Subset(Set s1, Set s2)`,
  substance: `Set A, B, C
Subset(B, A)
Subset(C, B)
AutoLabel All`,
  style: `canvas {
  width = 400
  height = 400
}
forall Set x {
  x.icon = Circle { }
  x.text = Equation {
    string : x.label
    fontSize : "28px"
  }
  ensure x.icon.r > 25
  ensure contains(x.icon, x.text)
  layer x.text above x.icon
}
forall Set x; Set y
where Subset(x, y) {
  ensure contains(y.icon, x.icon, 5)
  layer x.icon above y.icon
}`,
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const pair = document.createElement('div');
  pair.className = 'pair';
  stage.paper.append(pair);
  const panel = (svg: SVGSVGElement, caption: string): HTMLElement => {
    const fig = document.createElement('figure');
    const cap = document.createElement('figcaption');
    cap.textContent = caption;
    fig.append(svg, cap);
    return fig;
  };

  let turn = 0;
  const draw = async (): Promise<void> => {
    const variation = `optimized-${turn++ % 4}`;
    const compiled = await compile({ ...trio, variation });
    if (compiled.isErr()) return stage.fail(showError(compiled.error));
    const before = compiled.value;
    const after = optimize(before);
    if (after.isErr()) return stage.fail(after.error);
    const ns = `${stage.namespace}-${turn}`;
    const left = await toSVG(before, async () => undefined, `${ns}a`);
    const right = await toSVG(after.value, async () => undefined, `${ns}b`);
    if (stage.disposed) return;
    pair.replaceChildren(
      panel(left, `compiled: isOptimized → ${isOptimized(before)}`),
      panel(right, `optimize(compiled): isOptimized → ${isOptimized(after.value)}`),
    );
    stage.say(`variation "${variation}"`);
  };
  stage.button('Another variation', () => void draw());
  await draw();
  if (stage.preview) stage.every(3500, () => void draw());
  return () => stage.dispose();
};

export default mount;
