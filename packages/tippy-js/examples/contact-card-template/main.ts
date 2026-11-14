// A team list where one hidden contact-card template is reused for every name
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { TEAM } from './data.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover a name on the team list.' });

  const list = document.createElement('ul');
  list.className = 'team';
  const rows = TEAM.map((p, i) => {
    const li = document.createElement('li');
    const name = document.createElement('button');
    name.className = 'person';
    name.textContent = p.name.split(' ')[0]!;
    name.dataset.index = String(i);
    li.append(name);
    list.append(li);
    return name;
  });

  // The template: written once, never shown, copied into every tip.
  const template = document.createElement('div');
  template.hidden = true;
  template.innerHTML = `
    <div class="card">
      <div class="avatar"></div>
      <div class="who"><b class="c-name"></b><span class="c-role"></span><a class="c-mail"></a></div>
    </div>`;
  stage.root.append(list, template);

  stage.own(
    tippy(rows, {
      // Same template for everyone; only the blanks differ per reference.
      content(reference) {
        const person = TEAM[Number(reference.getAttribute('data-index'))]!;
        const card = document.createElement('div');
        card.innerHTML = template.innerHTML;
        card.querySelector('.avatar')!.textContent = person.emoji;
        card.querySelector('.c-name')!.textContent = person.name;
        card.querySelector('.c-role')!.textContent = person.role;
        card.querySelector('.c-mail')!.textContent = person.mail;
        return card;
      },
      placement: 'right',
      maxWidth: 'none',
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const row of rows) {
        await stage.ghost.hover(row, 550);
        await wait(1100);
      }
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
