// Path: SVG path commands, absolute and relative
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a command set: the string is shown under the shape.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const sets: Record<string, string> = {
    'M L Z': 'M 10 90 L 50 10 L 90 90 Z',
    'H V h v': 'M 10 10 H 90 V 50 h -40 v 40 H 10 Z',
    'm l relative': 'm 10 90 l 40 -80 l 40 80 z',
    'C S curves': 'M 10 60 C 10 0, 50 0, 50 50 S 90 100, 90 40',
    'Q T curves': 'M 10 50 Q 30 0, 50 50 T 90 50',
    'A arc': 'M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 0 1 10 50 Z',
  };
  const path = new Path({ ...mid(stage, S), scale: k, fill: '#32cd79', stroke: '#1d7a48', strokeWidth: 2 / k });
  leafer.add(path);
  const note = caption(stage, leafer);
  pick(stage, 'commands', Object.keys(sets), (name) => {
    path.path = sets[name]!;
    note.text = `${name}: ${sets[name]}`;
  }, 1800);

  return stage.dispose;
};

export default mount;
