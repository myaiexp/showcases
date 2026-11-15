// Redundant encodings: dash pattern and an end label back up the series color
import { defineChart, lineY, mountChart, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const dashes = ['0', '8 5', '2 4'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Turn the extra cues off: only hue separates the series.' });
  const build = (cues: boolean) =>
    defineChart({
      marks: [
        ...packageNames.map((name, i) =>
          lineY(
            downloads.filter((d) => d.package === name),
            { id: name, x: 'week', y: 'downloads', stroke: packageColors[i], strokeWidth: 2.5, ...(cues ? { strokeDasharray: dashes[i] } : {}) },
          ),
        ),
        ...(cues
          ? packageNames.map((name, i) =>
              text(
                downloads.filter((d) => d.package === name).slice(-1),
                { x: 'week', y: 'downloads', text: 'package', dy: -9, fill: packageColors[i], fontSize: 11 },
              ),
            )
          : []),
      ],
      scales: { x: { scale: () => scalePoint<string>().padding(0.35) }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  const options = (cues: boolean) => ({ definition: build(cues), height: stage.height, ariaLabel: 'Weekly downloads for core, react and octane' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (on: boolean): void => {
    host.update(options(on));
    stage.say(on ? 'color + dash pattern + end label' : 'color only');
  };
  if (stage.bar) checkbox(stage.bar, 'dashes and labels', true, apply);
  else stage.cycle([true, false], 2200, apply);
  return () => stage.dispose();
};

export default mount;
