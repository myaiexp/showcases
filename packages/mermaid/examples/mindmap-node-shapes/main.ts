// Mindmap node shapes: id plus delimiters, nested by indentation
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Every shape the docs list, one branch each: id[...] id(...) id((...)) id))...(( id)...( id{{...}}.
const ALL_SHAPES = `mindmap
  root((Shapes))
    sq[Square]
    rd(Rounded square)
    ci((Circle))
    bg))Bang((
    cl)Cloud(
    hx{{Hexagon}}
    Default shape`;

// The same delimiters used for meaning: a project plan with a hexagon per workstream.
const PROJECT = `mindmap
  root((Product launch))
    design{{Design}}
      Brand identity
      Landing page
    build{{Build}}
      api[API]
      app(Mobile app)
    announce))Announce((
      Press kit
      Newsletter
    risks)Risks(
      Late payment provider review`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'All shapes', code: ALL_SHAPES },
      { label: 'Project plan', code: PROJECT },
    ],
  });

export default mount;
