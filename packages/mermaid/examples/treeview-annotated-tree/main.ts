// TreeView diagrams: indentation or box-drawing trees with icons, highlights and ## descriptions
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Box-drawing input: paste the output of a tree command; depth comes from the column of each branch.
const BOX = `treeView-beta
├── src/
│   ├── App.tsx :::highlight ## main component
│   └── index.ts ## entry point
├── .env ## environment variables
├── Dockerfile
└── package.json`;

// Indentation input with every annotation combined: a trailing / marks a folder, ::: a class, ## a description.
const ANNOTATED = `treeView-beta
    my-project/
        src/
            App.tsx :::highlight ## main component
            index.js ## entry point
        .env ## environment variables
        Dockerfile
        package.json`;

// showIcons turns on the built-in file and folder icons; icon(none) hides one node's icon.
const ICONS = `---
config:
  treeView:
    showIcons: true
---
treeView-beta
    src/
        index.js
        generated.js icon(none)
    package.json
    README.md`;

// Deeper box-drawing nesting, a monorepo layout.
const DEEP = `treeView-beta
├── packages/
│   ├── mermaid/
│   │   ├── src/
│   │   │   ├── parser.ts
│   │   │   └── renderer.ts
│   │   └── package.json
│   └── parser/
│       └── src/
└── README.md`;

// Labels are drawn as written, so emoji work as inline icons; rowIndent and lineThickness widen the tree.
const EMOJI = `---
config:
  treeView:
    rowIndent: 24
    lineThickness: 2
---
treeView-beta
    🚀 rocket-app/
        📦 packages/
            🎨 ui/
            🛠️ utils/
        🧪 tests/
        📝 README.md
        ⚙️ config.yaml`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Box-drawing with notes', code: BOX },
      { label: 'Combined annotations', code: ANNOTATED },
      { label: 'Built-in icons', code: ICONS },
      { label: 'Nested monorepo', code: DEEP },
      { label: 'Emoji and spacing', code: EMOJI },
    ],
  });

export default mount;
