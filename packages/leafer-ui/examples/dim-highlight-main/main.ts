// Appearance: leafer.dim fades all, dimskip keeps one element lit
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/bright'; // dim, dimskip and bright
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Turn dim on, then dimskip: the green rect stays lit without moving to the top." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.55 : 1;
  const ox = (stage.width - 320 * k) / 2;
  const oy = (stage.height - 150 * k) / 2 - 8;
  const at = (x: number, y: number) => ({ x: ox + (x - 100) * k, y: oy + (y - 100) * k, width: 100 * k, height: 100 * k });
  const left = new Rect({ ...at(100, 100), fill: '#FEB027', cornerRadius: [20, 0, 0, 20] });
  const main = new Rect({ ...at(260, 150), fill: '#32cd79', draggable: true });
  const right = new Rect({ ...at(320, 100), fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] });
  leafer.add([left, main, right]);
  main.dimskip = true;
  toggle(stage, 'leafer.dim', false, (v) => (leafer.dim = v), 1800);
  toggle(stage, 'main.dimskip', true, (v) => (main.dimskip = v), 5400);

  return stage.dispose;
};

export default mount;
