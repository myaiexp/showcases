// A project's file tree: folders inside folders, every level sortable and files movable between them
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

interface Node {
  name: string;
  children?: Node[]; // present (even empty) for a folder
}

const TREE: Node[] = [
  { name: 'src', children: [{ name: 'components', children: [{ name: 'Button.tsx' }, { name: 'Menu.tsx' }] }, { name: 'utils.ts' }] },
  { name: 'docs', children: [{ name: 'guide.md' }] },
  { name: 'assets', children: [] },
  { name: 'README.md' },
];

// The card gets a smaller tree so every row fits in 200px.
const PREVIEW_TREE: Node[] = [
  { name: 'src', children: [{ name: 'components', children: [{ name: 'Button.tsx' }] }, { name: 'utils.ts' }] },
  { name: 'docs', children: [{ name: 'guide.md' }] },
  { name: 'README.md' },
];

const mount: Mount = (el, { preview, signal }) => {
  const lists: HTMLUListElement[] = [];
  const build = (nodes: Node[], level: number): HTMLUListElement => {
    const ul = document.createElement('ul');
    ul.className = level === 0 ? 'tree' : 'tree sub';
    for (const node of nodes) {
      const li = document.createElement('li');
      li.className = node.children ? 'node folder' : 'node file';
      li.dataset['name'] = node.name;
      li.innerHTML = '<div class="entry"></div>';
      li.firstElementChild!.textContent = node.name;
      if (node.children) li.append(build(node.children, level + 1));
      ul.append(li);
    }
    lists.push(ul);
    return ul;
  };
  const tree = build(preview ? PREVIEW_TREE : TREE, 0);
  el.append(tree);

  // One shared group name lets items cross between every level. Each folder's own list is a Sortable,
  // so dragging a folder carries its contents along. dragoverBubble stays false (the default since
  // 1.8.0): the innermost list under the pointer handles the drag, and parents do not also react.
  const sortables = lists.map((ul) =>
    Sortable.create(ul, {
      group: 'tree',
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
      dragoverBubble: false,
      ghostClass: 'hole',
    }),
  );

  if (preview) {
    // Slide README.md into the docs folder, then back out to the top of the tree.
    loopDrive(el, signal, async (hand) => {
      const readme = [...tree.querySelectorAll<HTMLElement>('li')].find((n) => n.dataset['name'] === 'README.md')!;
      const docs = [...tree.children].find((n) => (n as HTMLElement).dataset['name'] === 'docs')!;
      const inDocs = readme.parentElement !== tree;
      await hand.drag(readme.querySelector('.entry')!, inDocs ? { el: tree.firstElementChild!.firstElementChild!, fy: 0.2 } : { el: docs.querySelector('ul')!.firstElementChild!, fy: 0.7 }, 1.1);
    }, 0.5);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag files into folders, folders into folders, even into the empty assets folder.';
    el.append(hint);
  }

  return () => release(...sortables);
};

export default mount;
