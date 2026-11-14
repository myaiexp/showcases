// The app's view of a post: title, author and text, faded in on arrival
import type { Post } from '../../shared/data.ts';

export interface PostCard {
  show(post: Post, author: string): void;
}

export function postCard(parent: HTMLElement): PostCard {
  const el = document.createElement('article');
  el.className = 'post';
  const title = document.createElement('h3');
  const by = document.createElement('div');
  by.className = 'by';
  const text = document.createElement('p');
  title.textContent = 'Waiting for the first post…';
  el.append(title, by, text);
  parent.append(el);
  return {
    show(post, author) {
      title.textContent = post.title;
      by.textContent = `#${post.id} · by ${author}`;
      text.textContent = post.body;
      el.animate([{ opacity: 0.2, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 300 });
    },
  };
}
