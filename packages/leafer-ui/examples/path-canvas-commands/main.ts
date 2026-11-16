// Path: canvas drawing commands N D X G F O P U
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a command: the string is shown under the shape.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const sets: Record<string, string> = {
    'N rect': 'N 10 20 80 60',
    'X roundRect': 'X 10 20 80 60 20',
    'D roundRect, 4 radii': 'D 10 20 80 60 0 30 0 30',
    'F ellipse': 'F 50 50 40 25',
    'G ellipse arc': 'G 50 50 40 25 30 0 270 0',
    'P circle': 'P 50 50 35',
    'O arc': 'O 50 50 35 -90 90 0',
    'U arcTo': 'M 10 90 L 10 10 U 10 10 90 10 30 L 90 10',
  };
  const path = new Path({ ...mid(stage, S), scale: k, fill: '#32cd79', stroke: '#1d7a48', strokeWidth: 2 / k });
  leafer.add(path);
  const note = caption(stage, leafer);
  pick(stage, 'command', Object.keys(sets), (name) => {
    path.path = sets[name]!;
    note.text = sets[name]!;
  }, 1600);

  return stage.dispose;
};

export default mount;
