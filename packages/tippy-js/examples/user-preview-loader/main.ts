// @mentions in a chat: each opens a tip that loads a profile once, then reuses it
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

interface Profile {
  name: string;
  role: string;
  city: string;
  color: string;
}

// The stand-in "API": local data returned after a short wait.
const USERS: Record<string, Profile> = {
  maya: { name: 'Maya Lind', role: 'Designer', city: 'Oslo', color: 'var(--purple)' },
  leo: { name: 'Leo Park', role: 'Photographer', city: 'Lisbon', color: 'var(--orange)' },
  ines: { name: 'Ines Duarte', role: 'Engineer', city: 'Porto', color: 'var(--cyan)' },
};

const MESSAGES = [
  { who: 'sam', before: 'Great call by ', mention: 'maya', after: ' on the layout.' },
  { who: 'kim', before: 'Thanks ', mention: 'leo', after: ', the photos look sharp.' },
  { who: 'ana', before: 'Ask ', mention: 'ines', after: ' about the deploy.' },
];

function profileCard(p: Profile, cached: boolean): HTMLElement {
  const card = document.createElement('div');
  card.className = 'profile';
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.background = p.color;
  avatar.textContent = p.name[0]!;
  const name = document.createElement('strong');
  name.textContent = p.name;
  const line = document.createElement('span');
  line.textContent = `${p.role}, ${p.city}`;
  const tag = document.createElement('em');
  tag.textContent = cached ? 'from cache' : 'just loaded';
  card.append(avatar, name, line, tag);
  return card;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover a name: the first look-up is slow, the second is instant.' });

  const chat = document.createElement('div');
  chat.className = 'chat';
  const mentions: HTMLElement[] = [];
  const rows = ctx.preview ? MESSAGES.slice(0, 2) : MESSAGES;
  for (const m of rows) {
    const row = document.createElement('div');
    row.className = 'msg';
    const who = document.createElement('b');
    who.textContent = `${m.who}: `;
    const mention = document.createElement('span');
    mention.className = 'mention';
    mention.tabIndex = 0;
    mention.dataset.user = m.mention;
    mention.textContent = `@${m.mention}`;
    row.append(who, m.before, mention, m.after);
    chat.append(row);
    mentions.push(mention);
  }
  stage.root.append(chat);

  const cache = new Map<string, Profile>();
  const pending = new Map<string, Promise<Profile>>();
  const lookUp = (user: string): Promise<Profile> => {
    let p = pending.get(user);
    if (!p) {
      // Stand-in request: one per user at a time, then cached.
      p = stage.wait(500 + Math.random() * 400).then(() => {
        cache.set(user, USERS[user]!);
        return USERS[user]!;
      });
      pending.set(user, p);
      p.finally(() => pending.delete(user)).catch(() => {});
    }
    return p;
  };

  for (const mention of mentions) {
    const user = mention.dataset.user!;
    stage.own(
      tippy(mention, {
        content: 'Loading...',
        placement: 'bottom-start',
        maxWidth: 190,
        appendTo: stage.root,
        onShow(instance) {
          const hit = cache.get(user);
          if (hit) return instance.setContent(profileCard(hit, true));
          lookUp(user)
            .then((p) => {
              if (instance.state.isVisible) instance.setContent(profileCard(p, false));
            })
            .catch(() => {});
        },
        onHidden(instance) {
          instance.setContent('Loading...');
        },
      }),
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      cache.clear();
      await stage.ghost.hover(mentions[0]!, 700);
      await wait(1900);
      stage.ghost.leave();
      await wait(500);
      await stage.ghost.hover(mentions[0]!, 400);
      await wait(1400);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 200, y: 160 }, 500);
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
