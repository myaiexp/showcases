// pick: limiting the candidates with findList, or ruling elements out with exclude
import { Leafer, LeafList, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { probe } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The point hits the topmost allowed square. The select changes which squares pick() may choose.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = stage.width;
  const h = stage.height;
  const s = Math.min(h * 0.6, w * 0.38);
  const colors = ['#4B8BFF', '#32cd79', '#feb027'];
  const names = ['A', 'B', 'C'];
  const squares = names.map((name, i) => new Rect({ name, x: w * 0.1 + i * s * 0.55, y: h * 0.14 + i * s * 0.18, width: s, height: s, fill: colors[i], cornerRadius: 8 }));
  leafer.add(squares);
  const say = label(stage, '', true);

  const modes: Record<string, object> = {
    'no options': {},
    'findList: [A, B]': { findList: [squares[0], squares[1]] },
    'exclude: C': { exclude: new LeafList(squares[2]) },
    'exclude: B and C': { exclude: new LeafList([squares[1]!, squares[2]!]) },
  };
  let mode = 'no options';
  let at = { x: w / 2, y: h / 2 };
  const check = (): void => {
    const hit = leafer.pick(at, modes[mode] as never);
    squares.forEach((sq) => (sq.opacity = hit.target === sq ? 1 : 0.4));
    say(`pick(point, { ${mode === 'no options' ? '' : mode} }) -> ${hit.target?.name || 'nothing'}`);
  };
  probe(stage, leafer, (p) => ((at = p), check()));
  pick(stage, 'options', Object.keys(modes), (m) => ((mode = m), check()), 3000);
  return stage.dispose;
};

export default mount;
