// Post effect scene (a picture, a headline) and the stage centre in canvas uv
import type { VFX } from '@vfx-js/core';
import { picture, type PictureKind } from './pictures.ts';
import type { Stage } from './stage.ts';
import { headline } from './subjects.ts';

/**
 * Adds a picture (drawn with `sinewave`) and a headline (drawn with `rainbow`) to the
 * stage, so a post effect has more than one element to work on.
 */
export async function postScene(stage: Stage, vfx: VFX, kind: PictureKind = 'flowers'): Promise<void> {
  const img = await picture(kind, stage.preview ? 150 : 340);
  const title = headline('Post');
  title.style.fontSize = stage.preview ? '36px' : '72px';
  stage.root.append(img, title);
  await vfx.add(img, { shader: 'sinewave' });
  await vfx.add(title, { shader: 'rainbow' });
}

/**
 * The stage centre in the canvas's uv space (0..1, y up). A post effect sees the whole
 * canvas, which here covers the window, so uv 0.5 is the window's centre, not the stage's.
 */
export function stageCenter(stage: Stage): () => [number, number] {
  return () => {
    const r = stage.root.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    return [(r.left + r.width / 2) / vw, 1 - (r.top + r.height / 2) / vh];
  };
}
