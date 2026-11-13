// Fuzzy package search; the gallery card cycles sample queries on a timer
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PACKAGES, type Pkg } from './data.ts';
import { renderAll, renderResults } from './render.ts';
import './style.css';

const PREVIEW_QUERIES = ['recat', 'loash', 'animtion', 'typscript'];

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const fuse = new Fuse<Pkg>(PACKAGES, {
    keys: ['name', 'description'],
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
  });

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input';
  input.placeholder = 'Search packages... try "recat" or "loash"';
  const list = document.createElement('ul');
  list.className = 'results-list';
  el.append(input, list);

  const search = (): void => {
    const query = input.value.trim();
    if (!query) renderAll(PACKAGES, list);
    else renderResults(fuse.search(query), list, preview ? 2 : 10);
  };

  if (preview) {
    input.readOnly = true;
    let i = 0;
    const step = (): void => {
      input.value = PREVIEW_QUERIES[i++ % PREVIEW_QUERIES.length] ?? '';
      search();
    };
    step();
    const timer = window.setInterval(step, 2200);
    return () => clearInterval(timer);
  }

  renderAll(PACKAGES, list);
  input.addEventListener('input', search);
  return () => input.removeEventListener('input', search);
};

export default mount;
