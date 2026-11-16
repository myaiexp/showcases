// Appearance: linear gradient stops with offsets and as strings
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';
import { note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the middle stop of the left rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.75;
  const y = (stage.height - S) / 2 - 8;
  const left = new Rect({ x: stage.width / 2 - S - 8, y, width: S, height: S, cornerRadius: 10 });
  const right = new Rect({ x: stage.width / 2 + 8, y, width: S, height: S, cornerRadius: 10 });
  right.fill = { type: 'linear', stops: ['#FF4B4B', '#FEB027', '#79CB4D'] }; // offsets 0, 0.5, 1
  leafer.add([left, right]);
  note(leafer, '{ offset, color }', left.x!, y + S + 6, 11, S);
  note(leafer, "['#FF4B4B', …] strings", right.x!, y + S + 6, 11, S);

  drive(stage, 'middle offset', [0.05, 0.95, 0.01], 0.5, (m) => {
    left.fill = {
      type: 'linear',
      stops: [
        { offset: 0, color: '#FF4B4B' },
        { offset: m, color: '#FEB027' },
        { offset: 1, color: '#79CB4D' },
      ],
    };
  });

  return stage.dispose;
};

export default mount;
