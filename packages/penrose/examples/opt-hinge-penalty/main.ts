// A pull plus a hinge wall, the hinge written with max or with ifCond
import { add, gt, ifCond, max, mul, problem, squared, sub, variable } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { chart1d } from '../../shared/opt-charts.ts';
import { el, label } from '../../shared/opt-svg.ts';
import { runLoop } from '../../shared/opt-run.ts';
import { createStage } from '../../shared/stage.ts';

const WALL = 3;

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx);
  const x = variable(10);
  // pull: 0.2 (x - 9)², smallest at x = 9
  const pull = mul(0.2, squared(sub(x, 9)));
  // hinge: zero while x <= 3, then the distance past 3. Two spellings of the same function:
  const hingeMax = max(0, sub(x, WALL));
  const hingeIf = ifCond(gt(x, WALL), sub(x, WALL), 0);
  const energy = (hinge: typeof hingeMax) => add(pull, mul(5, squared(hinge)));
  const spellings = {
    max: { text: 'max(0, x - 3)', e: energy(hingeMax) },
    ifCond: { text: 'ifCond(gt(x, 3), x - 3, 0)', e: energy(hingeIf) },
  } as const;
  const problems = { max: await problem({ objective: spellings.max.e }), ifCond: await problem({ objective: spellings.ifCond.e }) };
  if (stage.disposed) return () => stage.dispose();
  const chart = await chart1d(stage, { x, curve: spellings.max.e, domain: [-6, 12], top: 40 });
  el('rect', { x: chart.sx(WALL), y: 14, width: chart.sx(12) - chart.sx(WALL), height: chart.sy(0) - 14, fill: 'rgb(214 51 108 / 0.08)' }, chart.layer);
  label(chart.layer, chart.sx(WALL) + 6, 28, 'hinge active', { fill: '#a61e4d' });

  let forced: 'max' | 'ifCond' | null = null;
  stage.select('hinge', [['max', 'max(0, x - 3)'], ['ifCond', 'ifCond(gt(x, 3), …)']], 'max', (v) => {
    forced = v as 'max' | 'ifCond';
    loop.restart();
  });
  const spell = (attempt: number): 'max' | 'ifCond' => forced ?? (attempt % 2 === 0 ? 'max' : 'ifCond');
  const loop = runLoop(stage, {
    begin(attempt) {
      chart.reset();
      return problems[spell(attempt)].start({});
    },
    show(run, iteration, attempt) {
      const now = run.vals.get(x) ?? 10;
      chart.move(now);
      stage.say(`${spellings[spell(attempt)].text} · iteration ${iteration} · x = ${now.toFixed(2)}${run.converged ? ' · converged' : ''}`, run.converged ? 'ok' : 'info');
    },
  });
  return () => stage.dispose();
};

export default mount;
