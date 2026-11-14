// renderer.checkbox makes task boxes clickable, with a progress bar
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const PACKING = `# Packing for the trip

- [x] Passport
- [x] Phone charger
- [ ] Sunscreen
- [ ] Swimsuit
- [ ] Book for the plane`;

const CARD = `- [ ] Passport
- [ ] Charger
- [ ] Sunscreen
- [ ] Swimsuit`;

/** Rewrites the nth "[ ]" / "[x]" marker in the Markdown, so ticking a box edits the source. */
function setMarker(md: string, n: number, checked: boolean): string {
  let i = -1;
  return md.replace(/^(\s*(?:[-*+]|\d+\.)\s+)\[[ xX]\]/gm, (all, lead: string) => (++i === n ? `${lead}[${checked ? 'x' : ' '}]` : all));
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick a box: the Markdown on the left changes too' });

  // The default checkbox is disabled; this one is left clickable.
  const live = new Marked({
    renderer: {
      checkbox({ checked }) {
        return `<input type="checkbox" class="tick"${checked ? ' checked' : ''}> `;
      },
    },
  });

  const src = sourcePane(stage, stage.preview ? '' : PACKING);
  const doc = docPane(stage, 'Checklist');
  const bar = document.createElement('div');
  bar.className = 'progress';
  const fill = document.createElement('div');
  fill.className = 'fill';
  const label = document.createElement('span');
  bar.append(fill, label);
  doc.el.append(bar);
  row(stage.root, src.el, doc.el);
  if (!stage.preview) note(stage.root, 'Ticking a box edits the Markdown, and the bar counts the ticked boxes. The built-in checkbox is disabled; this renderer leaves it clickable.');

  const boxes = (): HTMLInputElement[] => [...doc.body.querySelectorAll<HTMLInputElement>('input.tick')];
  const count = (): void => {
    const all = boxes();
    const done = all.filter((b) => b.checked).length;
    fill.style.width = all.length ? `${(100 * done) / all.length}%` : '0%';
    label.textContent = `${done} of ${all.length} done`;
  };
  const draw = (md: string): void => {
    doc.show(render(live, md));
    count();
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      src.set('');
      for (let n = 0; n <= CARD.length; n += 3) {
        src.set(CARD.slice(0, n));
        draw(CARD.slice(0, n));
        await wait(45);
      }
      draw(CARD);
      for (const [i, box] of boxes().entries()) {
        await wait(700);
        box.checked = true;
        src.set(setMarker(src.value(), i, true));
        count();
      }
      await wait(2000);
    });
  } else {
    src.onInput(draw);
    stage.listen(doc.body, 'change', (e) => {
      const box = e.target as HTMLInputElement;
      const n = boxes().indexOf(box);
      if (n >= 0) src.set(setMarker(src.value(), n, box.checked));
      count();
    });
    draw(PACKING);
  }

  return () => stage.dispose();
};

export default mount;
