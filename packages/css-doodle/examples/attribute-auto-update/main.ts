// auto:update redraws on a fixed interval; the full view changes or removes it
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(
    `
    @grid: 5 / 100%;
    @size: 19%;
    @content: @i;
    background: #e6437d;
    color: #fff;
    transition: @r(1s);
    @place: @pd.m5x5(
      @nx(*20%, -10%) @ny(*20%, -10%)
    );
    rotate: @p(0, 90deg, 180deg, 270deg);
  `,
    { attrs: { 'auto:update': '2s' } },
  );
  if (stage.bar) {
    const bar = stage.bar;
    const on = checkbox(bar, 'auto:update', true, (v) => set(v, sel.value));
    const intervals = ['500ms', '1s', '2s', '5s'] as const;
    const sel = select(bar, 'every', intervals.map((v, i) => [i, v] as const), (i) => set(on.checked, String(i)), 2);
    const set = (enabled: boolean, index: string): void => {
      const v = intervals[Number(index)]!;
      if (enabled) doodle.setAttribute('auto:update', v);
      else doodle.removeAttribute('auto:update');
      stage.say(enabled ? `auto:update="${v}"` : 'Attribute removed: the timer stopped');
    };
  }
  stage.say('auto:update="2s"');
  return () => stage.dispose();
};

export default mount;
