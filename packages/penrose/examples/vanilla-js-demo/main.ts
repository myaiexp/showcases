// The Vanilla JS page's demo: one Set drawn as a circle around its TeX label
import { compile, optimize, showError, toSVG } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The trio from vanilla-js-demo.html, unchanged; the page loads @penrose/core from a CDN
// through an import map, while this gallery's bundler resolves the same import.
const trio = {
  substance: `
          Set A
          Label A $e=mc^2$
        `,
  style: `canvas {
          width = 150
          height = 150
        }
        forall Set A {
          center = (0, 0)
          Circle { 
            center: center
            r: 50
         }
          Equation { 
            center: center
            string: A.label
          }
        }
        `,
  domain: `type Set`,
  variation: `test`,
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { maxHeight: 360 });
  const compiled = await compile(trio);
  if (compiled.isErr()) {
    stage.fail(showError(compiled.error));
    return () => stage.dispose();
  }
  const optimized = optimize(compiled.value);
  if (optimized.isErr()) {
    stage.fail(showError(optimized.error));
    return () => stage.dispose();
  }
  stage.show(await toSVG(optimized.value, async () => undefined, stage.namespace));
  // Nothing in this trio is sampled except the circle's colour; cycle through a few.
  if (stage.preview) {
    let n = 0;
    stage.every(2500, () => {
      void compile({ ...trio, variation: `test-${++n % 5}` }).then(async (c) => {
        if (c.isErr() || stage.disposed) return;
        const o = optimize(c.value);
        if (o.isOk()) stage.show(await toSVG(o.value, async () => undefined, stage.namespace));
      });
    });
  }
  return () => stage.dispose();
};

export default mount;
