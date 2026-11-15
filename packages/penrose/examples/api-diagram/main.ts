// diagram(trio, node, pathResolver) compiles, optimizes and appends the SVG in one call
import { diagram } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const trio = {
  domain: `type Set
predicate Disjoint(Set s1, Set s2)
predicate Subset(Set s1, Set s2)`,
  substance: `Set A, B, C, D
Subset(B, A)
Subset(C, A)
Disjoint(B, C)
AutoLabel All`,
  style: `canvas {
  width = 500
  height = 400
}
forall Set x {
  shape x.icon = Circle { }
  shape x.text = Equation {
    string : x.label
    fontSize : "28px"
  }
  ensure contains(x.icon, x.text)
  encourage norm(x.text.center - x.icon.center) == 0
  layer x.text above x.icon
}
forall Set x; Set y
where Subset(x, y) {
  ensure contains(y.icon, x.icon, 5)
  ensure disjoint(y.text, x.icon, 10)
  layer x.icon above y.icon
}
forall Set x; Set y
where Disjoint(x, y) {
  ensure disjoint(x.icon, y.icon)
}`,
  excludeWarnings: [],
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const variations = ['diagram', 'diagram-2', 'diagram-3'];
  let turn = 0;
  const draw = async (): Promise<void> => {
    const variation = variations[turn++ % variations.length]!;
    // diagram() appends to the node it is given, so each layout gets a fresh one.
    const node = document.createElement('div');
    node.className = 'diagram-node';
    try {
      // No Image shapes here, so the path resolver never has anything to resolve.
      await diagram({ ...trio, variation }, node, async () => undefined, `${stage.namespace}-${turn}`);
    } catch (err) {
      return stage.fail(err);
    }
    if (stage.disposed) return;
    stage.paper.querySelector('.diagram-node')?.remove();
    stage.paper.append(node);
    stage.say(`variation "${variation}"`);
  };
  stage.button('Another variation', () => void draw());
  await draw();
  if (stage.preview) stage.every(3500, () => void draw());
  return () => stage.dispose();
};

export default mount;
