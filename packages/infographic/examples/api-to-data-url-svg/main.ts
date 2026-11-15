// toDataURL({ type: 'svg' }): the export as a data URL, displayed in an <img>
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-grid-compact-card
theme dark
data
  title Exported
  lists
    - label Fast
      icon bolt
    - label Small
      icon compress
    - label Clear
      icon eye`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const live = document.createElement('div');
  live.style.cssText = 'flex:1;position:relative;min-width:0';
  const img = document.createElement('img');
  img.alt = 'the SVG export';
  img.style.cssText = 'flex:1;min-width:0;object-fit:contain;background:repeating-conic-gradient(#2a2a2e 0 25%, #1b1b1e 0 50%) 0 0/16px 16px;border-radius:6px';
  stage.box.append(live, img);

  const infographic = stage.own(new Infographic({ container: live, width: '100%', height: '100%', padding: ctx.preview ? 4 : 16 }));
  infographic.render(SYNTAX);

  const side = stage.side('toDataURL()');
  const flags = { embedResources: true, removeBackground: false };
  const run = async () => {
    const url = await infographic.toDataURL({ type: 'svg', ...flags });
    if (stage.disposed) return;
    img.src = url;
    stage.say(`toDataURL({ type: 'svg', embedResources: ${flags.embedResources}, removeBackground: ${flags.removeBackground} }): ${(url.length / 1024).toFixed(1)} KB`);
    if (side) side.textContent = `${url.slice(0, 140)}...`;
  };
  stage.select('removeBackground', ['false', 'true'], 'false', (v) => { flags.removeBackground = v === 'true'; void run(); });
  stage.select('embedResources', ['true', 'false'], 'true', (v) => { flags.embedResources = v === 'true'; void run(); });

  stage.cycle([
    { run: () => { flags.removeBackground = false; return run(); }, hold: 1800 },
    { run: () => { flags.removeBackground = true; return run(); }, hold: 1800 },
  ]);
  return () => stage.dispose();
};

export default mount;
