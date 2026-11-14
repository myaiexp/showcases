// Article footnotes: each marker names a hidden template, one content function finds it
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover or Tab to a [1] [2] [3] marker.' });

  // The page: text with markers, plus hidden templates holding the footnote text.
  // Everything here is constant markup, so reading innerHTML back is safe.
  stage.root.innerHTML = `
    <article class="article">
      <h3>Why lighthouses blink</h3>
      <p>Each lighthouse has its own pattern of flashes<button class="fn" data-template="fn-1">[1]</button>
      so a sailor can tell them apart at night. Older lamps burned oil<button class="fn" data-template="fn-2">[2]</button>
      and turned behind glass lenses; today a bulb and a motor do the job<button class="fn" data-template="fn-3">[3]</button>.</p>
    </article>
    <div class="templates" hidden>
      <div id="fn-1"><strong>Light character.</strong> The pattern is called the <em>character</em> of the light, for example "two flashes every ten seconds".</div>
      <div id="fn-2"><strong>Whale oil, then kerosene.</strong> Keepers trimmed wicks and polished brass every day.</div>
      <div id="fn-3"><strong>Automation.</strong> Most lights now run unmanned and are checked from the shore.</div>
    </div>`;
  const markers = [...stage.root.querySelectorAll<HTMLElement>('[data-template]')];

  stage.own(
    tippy(markers, {
      // One function for every marker: the attribute names the template to copy.
      content(reference) {
        const id = reference.getAttribute('data-template')!;
        return stage.root.querySelector(`#${id}`)!.innerHTML;
      },
      allowHTML: true,
      maxWidth: 230,
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const marker of markers) {
        await stage.ghost.hover(marker, 650);
        await wait(1500);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
