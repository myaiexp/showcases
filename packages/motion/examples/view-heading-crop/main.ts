// A list title that morphs into an article heading, with aspect-ratio cropping on or off
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.list{display:flex;flex-direction:column;gap:6px}
.item{display:flex;flex-direction:column;gap:2px;text-align:left;padding:10px 12px;border-radius:10px;background:var(--bg-surface);border:1px solid var(--border);color:var(--fg-1);cursor:pointer}
.title{font-size:13px;font-weight:600;align-self:flex-start}
.meta{font-size:11px;color:var(--fg-3)}
.article{padding:6px 2px;display:flex;flex-direction:column;gap:10px}
.heading{margin:0;font-size:30px;line-height:1.1;align-self:flex-start;width:max-content;color:var(--accent)}
.article p{margin:0;font-size:12px;color:var(--fg-2);line-height:1.5}
.mode{font-size:11px;color:var(--fg-3);margin-top:8px;text-align:center}
`;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  stage.app.innerHTML = '<div class="screen"></div><div class="mode"></div>';
  const screen = stage.app.querySelector('.screen') as HTMLElement;
  const mode = stage.app.querySelector('.mode') as HTMLElement;
  let crop = false;
  let reading = false;

  const showList = (): void => {
    screen.innerHTML = `<div class="list">
      <button class="item"><span class="title">Autumn notes</span><span class="meta">4 min read</span></button>
      <button class="item"><span class="meta">Winter reading list</span></button></div>`;
    screen.querySelector('.item')?.addEventListener('click', toggle);
  };
  const showArticle = (): void => {
    screen.innerHTML = `<div class="article"><h2 class="heading">Autumn notes</h2>
      <p>The light changes first. Then the air, then the way you plan your evenings.</p><button class="back">Back</button></div>`;
    screen.querySelector('.back')?.addEventListener('click', toggle);
  };
  const toggle = (): void => {
    reading = !reading;
    mode.textContent = crop ? 'default cropping' : 'crop(false)';
    // add(from, to) morphs two different elements into one. crop(false) switches off the
    // clipping Motion adds when the box changes aspect ratio, which suits text.
    const [from, to] = reading ? ['.title', '.heading'] : ['.heading', '.title'];
    const b = animateView(reading ? showArticle : showList, { duration: 0.7, ease: 'easeInOut' }).add(from!, to!);
    if (!crop) b.crop(false);
  };
  showList();
  mode.textContent = 'tap the title';

  if (preview) {
    let n = 0;
    stage.every(() => {
      if (!reading) crop = n++ % 2 === 1;
      toggle();
    }, 1.8, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.toggle('Crop (default)', false, (v) => { crop = v; });
  hint(el, 'Open the article and go back. With "Crop" off, crop(false) lets the text scale smoothly; on, Motion clips the title as its box changes shape, so the letters get cut off mid-way.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
