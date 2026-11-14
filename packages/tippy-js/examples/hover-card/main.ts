// Usernames in comments: some open an interactive profile card, one opens a plain tip
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const PEOPLE = [
  { handle: 'maya', name: 'Maya Lind', bio: 'Maps, bikes and bad puns. Building small tools.', color: 'var(--purple)', rich: true, said: 'This is the best release yet.' },
  { handle: 'leo', name: 'Leo Park', bio: 'Photographer. Always carrying one lens too many.', color: 'var(--orange)', rich: true, said: 'Agreed, the new export is great.' },
  { handle: 'sam', name: 'Sam K.', bio: '', color: 'var(--cyan)', rich: false, said: 'Same here.' },
];

const mount: Mount = (el, ctx) => {
  // The card shows two comments (an interactive and a plain name); the full view shows all three.
  const people = ctx.preview ? [PEOPLE[0]!, PEOPLE[2]!] : PEOPLE;
  const stage = createStage(el, ctx, { height: 320, hint: 'Hover a name. Move into the card and press Follow.' });

  const thread = document.createElement('div');
  thread.className = 'thread';
  const names: HTMLElement[] = [];
  const tips: Instance[] = [];
  let follow: HTMLButtonElement | null = null;

  for (const p of people) {
    const row = document.createElement('div');
    row.className = 'comment';
    const name = document.createElement('a');
    name.href = '#';
    name.className = 'handle';
    name.textContent = `@${p.handle}`;
    name.addEventListener('click', (e) => e.preventDefault());
    const said = document.createElement('span');
    said.textContent = ` ${p.said}`;
    row.append(name, said);
    thread.append(row);
    names.push(name);

    let content: string | HTMLElement = `${p.name} · plain tip, gone when you leave`;
    if (p.rich) {
      const card = document.createElement('div');
      card.className = 'card';
      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.style.background = p.color;
      avatar.textContent = p.name[0]!;
      const title = document.createElement('strong');
      title.textContent = p.name;
      const bio = document.createElement('p');
      bio.textContent = p.bio;
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.textContent = 'Follow';
      btn.addEventListener('click', () => {
        btn.textContent = btn.textContent === 'Follow' ? 'Following ✓' : 'Follow';
      });
      if (p === people[0]) follow = btn;
      card.append(avatar, title, bio, btn);
      content = card;
    }
    const tip = tippy(name, {
      content,
      // An interactive tip can be entered and clicked inside; the delay gives the pointer time to get there.
      interactive: p.rich,
      delay: p.rich ? [150, 200] : 0,
      placement: 'bottom-start',
      maxWidth: 220,
      appendTo: stage.root,
    });
    stage.own(tip);
    tips.push(tip);
  }
  stage.root.append(thread);

  if (stage.preview) {
    stage.play(async (wait) => {
      if (follow) follow.textContent = 'Follow';
      await stage.ghost.moveTo(names[0]!, 600);
      // Card: opened by code. A real hover would follow the page's mouse (see stage.ts).
      tips[0]!.show();
      await wait(500);
      await stage.ghost.click(follow!, 800);
      await wait(900);
      tips[0]!.hide();
      await wait(500);
      await stage.ghost.hover(names[names.length - 1]!, 700);
      await wait(1300);
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
