// Text made before its font loaded is wrong until clearFontCache + initDimensions
import { Canvas, FabricText, cache } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { FONTS } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, INK } from '../../shared/text.ts';

const FAMILY = 'showcase-late-caveat';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The blue box is the text object. Fabric caches glyph widths per family, so a font that arrives late leaves the box (and the click area) at the old size.',
  });
  // A face that exists but is not in document.fonts yet: stands in for a web font still downloading.
  const face = new FontFace(FAMILY, `url(${FONTS.Caveat[0]!.url})`);
  await face.load();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  // Created while the family is unknown: measured with the fallback font.
  const text = new FabricText('Late arriving', {
    left: 180,
    top: 120,
    fontFamily: FAMILY,
    fontSize: 58,
    fill: INK,
    backgroundColor: 'rgba(59,125,216,0.18)',
    stroke: BLUE,
    strokeWidth: 0,
  });
  canvas.add(text);
  const say = status(stage);
  const show = (note: string): void => {
    canvas.requestRenderAll();
    say(`${note}\nbox width ${text.width.toFixed(0)}`);
  };
  show('1. no font: fallback metrics');

  const reset = (): void => {
    document.fonts.delete(face);
    cache.clearFontCache(FAMILY);
    text.initDimensions();
    text.setCoords();
    show('1. no font: fallback metrics');
  };
  const load = (): void => {
    document.fonts.add(face);
    // The glyphs now draw in the new font, but widths came from the cache and the bitmap is cached too.
    text.set('dirty', true);
    show('2. font in: glyphs new, box stale');
  };
  const fix = (): void => {
    cache.clearFontCache(FAMILY);
    text.initDimensions();
    text.setCoords();
    show('3. cache cleared: box fits');
  };
  stage.onDispose(() => {
    document.fonts.delete(face);
    cache.clearFontCache(FAMILY);
  });

  if (stage.bar) {
    button(stage.bar, 'Load the font', load);
    button(stage.bar, 'clearFontCache + initDimensions', fix);
    button(stage.bar, 'Reset', reset);
  } else {
    stage.repeat(async () => {
      reset();
      await stage.wait(1400);
      load();
      await stage.wait(1500);
      fix();
      await stage.wait(1800);
    }, 100);
  }
  return stage.dispose;
};

export default mount;
