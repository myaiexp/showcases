// Patterns: a Pattern from a painted tile, with the four repeat modes
import { Canvas, Pattern, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { tile } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Repeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
const REPEATS: Repeat[] = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'source can be any canvas or image: here a 40 px tile painted in code. The repeat mode decides where the tile is drawn.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const rect = new Rect({ left: 180, top: 120, width: 280, height: 190, stroke: '#2b2b2b', strokeWidth: 2 });
  canvas.add(rect);

  const source = tile('dots', 40, '#e94b3c', '#fcd34d');
  const apply = (repeat: Repeat): void => {
    rect.set('fill', new Pattern({ source, repeat }));
    say(`repeat: '${repeat}'`);
    canvas.requestRenderAll();
  };

  apply('repeat');
  if (stage.preview) {
    let k = 0;
    stage.every(1100, () => apply(REPEATS[++k % REPEATS.length]!));
  } else select(stage.bar!, 'repeat', REPEATS, apply);

  return stage.dispose;
};

export default mount;
