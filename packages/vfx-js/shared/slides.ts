// A fixed-size box of slides (picture + heading) for the transition examples
import { pictureUrl, type PictureKind } from './pictures.ts';
import type { Stage } from './stage.ts';

export interface SlideSpec {
  kind: PictureKind;
  title: string;
}

export const DEFAULT_SLIDES: readonly SlideSpec[] = [
  { kind: 'landscape', title: 'Dusk' },
  { kind: 'city', title: 'Night' },
  { kind: 'flowers', title: 'Meadow' },
];

/** One slide: a <section> with a background picture and a heading. */
export function slide(spec: SlideSpec): HTMLElement {
  const section = document.createElement('section');
  section.className = 'vx-slide';
  const img = new Image();
  img.src = pictureUrl(spec.kind);
  img.alt = '';
  const h = document.createElement('h3');
  h.textContent = spec.title;
  section.append(img, h);
  return section;
}

/**
 * A slide box with a fixed size (transitions want one: the old and new content then
 * share the box). The first slide shows; the others are `hidden`. Resolves once the
 * pictures have decoded.
 */
export async function slideBox(stage: Stage, specs: readonly SlideSpec[] = DEFAULT_SLIDES): Promise<HTMLElement> {
  const box = document.createElement('div');
  box.className = 'vx-slides';
  // Inline px: the transition's wrapper canvas reads only an inline width (a class width
  // would stretch it to the parent's width).
  box.style.width = stage.preview ? '220px' : '420px';
  box.style.height = stage.preview ? '136px' : '260px';
  const sections = specs.map(slide);
  sections.forEach((s, i) => {
    s.hidden = i > 0;
  });
  box.append(...sections);
  stage.root.append(box);
  await Promise.all(sections.map((s) => s.querySelector('img')!.decode().catch(() => undefined)));
  return box;
}
