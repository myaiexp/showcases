// Markdown kept in a hidden textarea, rendered into a div by one line
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';

const PAGE = `# Weekend plans

Lots of **small things** to do:

- Pick up the _bike_
- Call Gran`;

const CARD_PAGE = '# Weekend\n\nPick up\nthe **bike**';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the hidden textarea, then press Run script' });

  // The page's own markup: a textarea nobody sees, and the div the script fills.
  const hidden = document.createElement('textarea');
  hidden.hidden = true;
  hidden.id = 'markdown-source';
  const src = sourcePane(stage, stage.preview ? CARD_PAGE : PAGE, '<textarea id="markdown-source"> (hidden)');
  const content = docPane(stage, '<div id="content">');
  const label = content.el.querySelector('.mk-label');
  stage.root.append(hidden);
  row(stage.root, src.el, content.el);
  const empty = '<p><em>(empty, the script has not run)</em></p>';

  const run = (): void => {
    // The docs' whole script: read the textarea, parse, set the div.
    hidden.value = src.value();
    content.show(marked.parse(hidden.value, { async: false }));
    if (label) label.textContent = '<div id="content"> after the script';
  };
  const reset = (): void => {
    content.show(empty);
    if (label) label.textContent = '<div id="content"> before the script';
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      reset();
      await wait(1600);
      run();
      await wait(3200);
    });
  } else {
    reset();
    button(stage.bar!, 'Run script', run);
    button(stage.bar!, 'Reset page', reset);
    note(stage.root, 'The page starts with an empty content div. Running the script reads the hidden text and puts the formatted result inside.');
  }
  return () => stage.dispose();
};

export default mount;
