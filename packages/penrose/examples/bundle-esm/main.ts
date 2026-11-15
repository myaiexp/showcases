// @penrose/core/bundle: the experimental single-module build, loaded on demand
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const trio = {
  domain: `type Set
predicate Subset(Set s1, Set s2)`,
  substance: `Set A, B, C
Subset(B, A)
Subset(C, A)
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
}
forall Set x; Set y {
  ensure disjoint(x.text, y.icon, 4)
}`,
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.say('loading @penrose/core/bundle…');
  // The bundle carries every dependency in one ES module (about 2.6 MB), so it is only
  // fetched when this example mounts.
  const t0 = performance.now();
  const bundle = await import('@penrose/core/bundle');
  // The docs warn that the bundle's exports can still be undefined right after the import
  // (it sets them up asynchronously), and say to check before calling. The module's
  // bindings are live, so this waits a frame at a time until they are set.
  // Typed as always defined, so the check reads them as possibly undefined.
  const ready = (): boolean => [bundle.compile, bundle.optimize, bundle.toSVG].every((f) => (f as unknown) !== undefined);
  while (!ready()) {
    await new Promise((r) => requestAnimationFrame(r));
    if (stage.disposed) return () => stage.dispose();
    if (performance.now() - t0 > 15000) {
      stage.fail('@penrose/core/bundle loaded, but its exports were still undefined after 15 s');
      return () => stage.dispose();
    }
  }
  const { compile, optimize, toSVG, showError } = bundle;
  const loaded = Math.round(performance.now() - t0);
  if (stage.disposed) return () => stage.dispose();

  let turn = 0;
  const draw = async (): Promise<void> => {
    const variation = `bundle-${turn++ % 4}`;
    const compiled = await compile({ ...trio, variation });
    if (compiled.isErr()) return stage.fail(showError(compiled.error));
    const optimized = optimize(compiled.value);
    if (optimized.isErr()) return stage.fail(showError(optimized.error));
    stage.show(await toSVG(optimized.value, async () => undefined, stage.namespace));
    stage.say(stage.preview ? 'from @penrose/core/bundle' : `from @penrose/core/bundle (imported in ${loaded} ms) · variation "${variation}"`);
  };
  stage.button('Another variation', () => void draw());
  await draw();
  if (stage.preview) stage.every(3500, () => void draw());
  return () => stage.dispose();
};

export default mount;
