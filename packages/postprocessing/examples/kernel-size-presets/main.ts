// KernelSize presets read as Gaussians: the kernel width each enum value stands for
import { GaussKernel, KernelSize } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { kernelOf } from '../../shared/kernel.ts';
import { chartPanel, drawLabel, drawXTicks, plotArea } from '../../shared/utilities.ts';

// The KernelSize JSDoc says which Gaussian each preset matches. HUGE matches none.
const presets = [
  { name: 'VERY_SMALL', value: KernelSize.VERY_SMALL, gauss: 7, color: '#52d68a' },
  { name: 'SMALL', value: KernelSize.SMALL, gauss: 25, color: '#3fa7ff' },
  { name: 'MEDIUM', value: KernelSize.MEDIUM, gauss: 63, color: '#ffc93f' },
  { name: 'LARGE', value: KernelSize.LARGE, gauss: 127, color: '#ff8a3d' },
  { name: 'VERY_LARGE', value: KernelSize.VERY_LARGE, gauss: 391, color: '#e0457b' },
] as const;
type Name = (typeof presets)[number]['name'];

const mount: Mount = (el, ctx) => {
  const panel = chartPanel(el, ctx);
  let active: Name = 'MEDIUM';

  const paint = (): void => {
    const area = plotArea(panel, 0, 120, 1.05, 36, 34);
    const unit = area.width / 120;
    for (const p of presets) {
      const k = kernelOf(new GaussKernel(p.gauss, 2));
      const peak = k.weights[0]!;
      panel.ctx.beginPath();
      k.weights.forEach((w, i) => {
        if (i > 120) return;
        const x = area.left + i * unit;
        const y = area.top + area.height * (1 - w / peak);
        if (i === 0) panel.ctx.moveTo(x, y);
        else panel.ctx.lineTo(x, y);
      });
      panel.ctx.strokeStyle = p.color;
      panel.ctx.globalAlpha = p.name === active ? 1 : 0.35;
      panel.ctx.lineWidth = p.name === active ? 3 : 1.5;
      panel.ctx.stroke();
      panel.ctx.globalAlpha = 1;
    }
    drawXTicks(panel, area, 20);
    const a = presets.find((p) => p.name === active)!;
    drawLabel(panel, `KernelSize.${a.name} = ${a.value}: matches a ${a.gauss}x${a.gauss} Gaussian`, 36, 14, a.color);
    drawLabel(panel, 'weight relative to the centre tap, by offset in texels from the centre', 36, panel.height - 4, '#9aa3b5');
  };
  panel.draw(paint);

  const names = presets.map((p) => p.name);
  if (panel.bar) {
    select(panel.bar, 'KernelSize', names, (n) => {
      active = n;
      paint();
    }, active);
  } else {
    let i = 2;
    panel.every(1600, () => {
      active = names[++i % names.length]!;
      paint();
    });
  }
  return () => panel.dispose();
};

export default mount;
