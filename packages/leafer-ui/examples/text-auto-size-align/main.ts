// Text: autoSizeAlign anchors an auto-size text
import { Leafer, Path, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle autoSizeAlign and slide the text length.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const cx = stage.width / 2, cy = stage.height / 2 - 10;
  const cross = new Path({ path: `M ${cx - 8} ${cy} L ${cx + 8} ${cy} M ${cx} ${cy - 8} L ${cx} ${cy + 8}`, stroke: '#FF4B4B', strokeWidth: 2, hittable: false });
  const text = new Text({ x: cx, y: cy, text: 'Text', fill: '#333', fontSize: stage.preview ? 18 : 28, textAlign: 'center', autoSizeAlign: true });
  leafer.add([text, cross]);
  toggle(stage, 'autoSizeAlign', true, (v) => (text.autoSizeAlign = v), 2600);
  drive(stage, 'length', [1, 14, 1], 4, (v) => (text.text = 'Text '.repeat(v).trim()), 6);

  return stage.dispose;
};

export default mount;
