// The antv palette: eleven brand colours applied to items in order
import { getPalette, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const WORDS = ['Plan', 'Build', 'Test', 'Ship', 'Learn', 'Grow', 'Hire', 'Sell', 'Care', 'Fix', 'Rest'];
const COUNTS = [3, 6, 11];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 340 });
  stage.box.style.display = 'flex';
  stage.box.style.flexDirection = 'column';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative;min-height:0';
  const strip = document.createElement('div');
  strip.style.cssText = 'display:flex;height:14px;border-radius:4px;overflow:hidden';
  for (const colour of getPalette('antv') as string[]) {
    const s = document.createElement('span');
    s.style.cssText = `flex:1;background:${colour}`;
    strip.append(s);
  }
  stage.box.append(drawn, strip);

  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 6 : 20 }));
  stage.cycle(
    COUNTS.map((n) => ({
      say: `themeConfig.palette: 'antv', ${n} items`,
      run: () =>
        infographic.render({
          template: 'list-grid-compact-card',
          theme: 'dark',
          themeConfig: { palette: 'antv' },
          data: { lists: WORDS.slice(0, n).map((label) => ({ label, icon: label.toLowerCase() })) },
        }),
    })),
  );
  return () => stage.dispose();
};

export default mount;
