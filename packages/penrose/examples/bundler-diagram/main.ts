// The bundler page's main.js: import * as Penrose, then Penrose.diagram into an element
import * as Penrose from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const variations = ['', 'bundler-1', 'bundler-2', 'bundler-3'];
  let turn = 0;
  const draw = async (): Promise<void> => {
    const variation = variations[turn++ % variations.length]!;
    const node = document.createElement('div');
    node.id = 'penrose-diagram';
    try {
      await Penrose.diagram(
        {
          substance: `
  Set A, B
  Subset(A, B)
  `,
          style: `
  canvas {
      width = 400
      height = 400
  }
  forall Set s {
      s.shape = Circle {}
      ensure lessThan(20, s.shape.r)
  }
  forall Set s1, s2
  where Subset(s1, s2) {
      ensure contains(s2.shape, s1.shape)
      s2.shape above s1.shape
  }
  `,
          domain: `type Set
  predicate Subset(Set, Set)`,
          variation,
          excludeWarnings: [],
        },
        node,
        async () => undefined,
        `${stage.namespace}-${turn}`,
      );
    } catch (err) {
      return stage.fail(err);
    }
    if (stage.disposed) return;
    stage.paper.querySelector('#penrose-diagram')?.remove();
    stage.paper.append(node);
    stage.say(`variation "${variation}"`);
  };
  stage.button('Another variation', () => void draw());
  await draw();
  if (stage.preview) stage.every(3000, () => void draw());
  return () => stage.dispose();
};

export default mount;
