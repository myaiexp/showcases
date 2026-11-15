// Re-render on a timer with new data: the values change, the template stays
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('data');
  // A small deterministic walk, so the card looks the same on every load.
  let seed = 7;
  const next = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
  let current = LABELS.map(() => 10 + Math.round(next() * 30));

  const draw = () => {
    const data = { title: 'Visits this week', values: LABELS.map((label, i) => ({ label, value: current[i] })) };
    infographic.render({ template: 'chart-column-simple', theme: 'dark', data });
    if (code) code.textContent = JSON.stringify(data, null, 2);
    stage.say('values: ' + current.join(', '));
  };

  draw();
  stage.every(ctx.preview ? 1400 : 1800, () => {
    current = current.map((v) => Math.max(3, Math.min(48, v + Math.round((next() - 0.5) * 24))));
    draw();
  });

  return () => stage.dispose();
};

export default mount;
