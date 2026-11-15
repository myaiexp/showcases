// The spectral palette: one continuous ramp stretched over any number of items
import { getPalette, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const WORDS = ['Visit', 'Browse', 'Add', 'Cart', 'Pay', 'Ship', 'Review', 'Return', 'Refer'];
const COUNTS = [3, 5, 9];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 340 });
  stage.box.style.display = 'flex';
  stage.box.style.flexDirection = 'column';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative;min-height:0';
  const strip = document.createElement('div');
  strip.style.cssText = 'display:flex;height:14px;border-radius:4px;overflow:hidden';
  const ramp = getPalette('spectral') as (ratio: number, index: number, count: number) => string;
  for (let i = 0; i < 24; i += 1) {
    const s = document.createElement('span');
    s.style.cssText = `flex:1;background:${ramp(i / 23, i, 24)}`;
    strip.append(s);
  }
  stage.box.append(drawn, strip);

  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 6 : 20 }));
  stage.cycle(
    COUNTS.map((n) => ({
      say: `themeConfig.palette: 'spectral', ${n} steps`,
      run: () =>
        infographic.render({
          template: 'sequence-funnel-simple',
          theme: 'dark',
          themeConfig: { palette: 'spectral' },
          data: { sequences: WORDS.slice(0, n).map((label) => ({ label })) },
        }),
    })),
  );
  return () => stage.dispose();
};

export default mount;
