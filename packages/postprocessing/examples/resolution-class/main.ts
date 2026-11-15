// Resolution: a base size, a scale, and preferred sizes that override it (AUTO_SIZE keeps the base)
import { Resolution } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { chartPanel, drawLabel } from '../../shared/utilities.ts';

const axes = ['none', 'preferredWidth', 'preferredHeight', 'both'] as const;
type Axis = (typeof axes)[number];

const mount: Mount = (el, ctx) => {
  const panel = chartPanel(el, ctx);
  const resolution = new Resolution(null, Resolution.AUTO_SIZE, Resolution.AUTO_SIZE, 1);
  resolution.setBaseSize(1280, 720);
  let changes = 0;
  // 'change' fires whenever the base size, scale or preferred size changes.
  resolution.addEventListener('change' as never, () => changes++);

  let scale = 0.5;
  let preferred = 320;
  let axis: Axis = 'none';
  const apply = (): void => {
    const { AUTO_SIZE } = Resolution;
    if (axis === 'none') {
      // Setting the scale also resets both preferred sizes to AUTO_SIZE.
      resolution.scale = scale;
    } else {
      resolution.setPreferredSize(
        axis === 'preferredHeight' ? AUTO_SIZE : preferred,
        axis === 'preferredWidth' ? AUTO_SIZE : axis === 'both' ? Math.round(preferred / 4) : Math.round(preferred / 1.78),
      );
    }
    paint();
  };

  const paint = (): void => {
    const { ctx: g, width, height } = panel;
    g.fillStyle = '#10131a';
    g.fillRect(0, 0, width, height);
    const k = Math.min((width - 40) / 1280, (height - 90) / 720);
    const ox = 20;
    const oy = 28;
    g.strokeStyle = '#6f7a90';
    g.lineWidth = 1;
    g.strokeRect(ox, oy, 1280 * k, 720 * k);
    g.fillStyle = 'rgba(255, 201, 63, 0.35)';
    g.fillRect(ox, oy, Math.min(resolution.width, 1280 * 2) * k, Math.min(resolution.height, 720 * 2) * k);
    g.strokeStyle = '#ffc93f';
    g.strokeRect(ox, oy, resolution.width * k, resolution.height * k);
    drawLabel(panel, `base ${resolution.baseWidth} x ${resolution.baseHeight} (outline)   effective ${resolution.width} x ${resolution.height} (gold)`, 20, 16);
    const y = oy + 720 * k + 18;
    drawLabel(panel, `scale ${resolution.scale}   preferredWidth ${resolution.preferredWidth}   preferredHeight ${resolution.preferredHeight}`, 20, y, '#9aa3b5');
    drawLabel(panel, `AUTO_SIZE = ${Resolution.AUTO_SIZE}   'change' events: ${changes}`, 20, y + 16, '#9aa3b5');
  };
  panel.draw(paint);
  apply();

  if (panel.bar) {
    slider(panel.bar, 'scale', 0.1, 1.5, 0.05, scale, (v) => {
      scale = v;
      axis = 'none';
      choose.value = 'none';
      apply();
    });
    slider(panel.bar, 'preferred px', 80, 1280, 10, preferred, (v) => {
      preferred = v;
      apply();
    });
    const choose = select(panel.bar, 'uses', axes, (a) => {
      axis = a;
      apply();
    });
  } else {
    let i = 0;
    panel.every(1800, () => {
      i++;
      axis = axes[i % axes.length]!;
      scale = [0.25, 0.5, 0.75, 1][i % 4]!;
      preferred = [320, 640, 960][i % 3]!;
      apply();
    });
  }
  return () => panel.dispose();
};

export default mount;
