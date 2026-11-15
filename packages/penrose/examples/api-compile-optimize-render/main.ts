// The Language API's own example: compile, optimize, then toSVG, each step timed
import { compile, optimize, showError, toSVG } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// trio.js from the Language API page.
const domain = `
type Set
predicate Disjoint(Set s1, Set s2)
predicate Intersecting(Set s1, Set s2)
predicate Subset(Set s1, Set s2)
`;
const style = `
canvas {
    width = 800
    height = 700
  }

  forall Set x {
    shape x.icon = Circle { }
    shape x.text = Equation {
      string : x.label
      fontSize : "32px"
    }
    ensure contains(x.icon, x.text)
    encourage norm(x.text.center - x.icon.center) == 0
    layer x.text above x.icon
  }

  forall Set x; Set y
  where Subset(x, y) {
    ensure disjoint(y.text, x.icon, 10)
    ensure contains(y.icon, x.icon, 5)
    layer x.icon above y.icon
  }

  forall Set x; Set y
  where Disjoint(x, y) {
    ensure disjoint(x.icon, y.icon)
  }

  forall Set x; Set y
  where Intersecting(x, y) {
    ensure overlapping(x.icon, y.icon)
    ensure disjoint(y.text, x.icon)
    ensure disjoint(x.text, y.icon)
  }
`;
const substance = `
Set A, B, C, D, E, F, G

Subset(B, A)
Subset(C, A)
Subset(D, B)
Subset(E, B)
Subset(F, C)
Subset(G, C)

Disjoint(E, D)
Disjoint(F, G)
Disjoint(B, C)

AutoLabel All
`;
const trio = { domain, substance, style, variation: 'test' };

const ms = (t0: number): string => `${Math.round(performance.now() - t0)} ms`;

/** script.js from the docs, timed. Throws a readable error, as the docs do. */
async function draw(variation: string, namespace: string): Promise<{ svg: SVGSVGElement; timing: string }> {
  let t0 = performance.now();
  const compiled = await compile({ ...trio, variation });
  // handle compilation errors
  if (compiled.isErr()) {
    throw new Error(showError(compiled.error));
  }
  const compileTime = ms(t0);
  t0 = performance.now();
  const converged = optimize(compiled.value);
  // handle optimization errors
  if (converged.isErr()) {
    throw new Error(showError(converged.error));
  }
  const optimizeTime = ms(t0);
  t0 = performance.now();
  // render the diagram state as an SVG (3.3.1 takes a namespace for its ids as well)
  const svg = await toSVG(converged.value, async () => undefined, namespace);
  return { svg, timing: `compile ${compileTime} · optimize ${optimizeTime} · toSVG ${ms(t0)}` };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // optimize() blocks until it converges, so each variation is solved once and kept.
  const variations = ['test', 'test-2', 'test-3'];
  const done = new Map<string, { svg: SVGSVGElement; timing: string }>();
  let shown = 0;
  const show = async (i: number): Promise<void> => {
    const variation = variations[i % variations.length]!;
    try {
      const cached = done.get(variation) ?? (await draw(variation, `${stage.namespace}-${done.size}`));
      if (stage.disposed) return;
      done.set(variation, cached);
      stage.show(cached.svg);
      stage.say(stage.preview ? `variation "${variation}"` : `variation "${variation}": ${cached.timing}`);
    } catch (err) {
      stage.fail(err);
    }
  };
  stage.button('Next variation', () => void show(++shown));
  await show(0);
  if (stage.preview) stage.every(3500, () => void show(++shown));
  return () => stage.dispose();
};

export default mount;
