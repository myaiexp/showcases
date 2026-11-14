// Storyline clock layout: nodes clockwise around an orbit, geometry computed by the layout
import type { Mount } from '@/types.ts';
import { mountStoryline } from '../../shared/ext-storyline.ts';

const mount: Mount = (el, ctx) =>
  mountStoryline(el, ctx, { layout: () => 'clock', previewCount: 4, height: 560 });

export default mount;
