// Block diagrams: composite blocks and how column widths follow their widest child
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A block ... end pair nests a block; the outer block still sizes to what it holds.
const NESTED = `block
    block
      D
    end
    A["A: I am a wide one"]`;

// Each named group has its own columns line; group2 leaves it at auto and rewraps by what fits.
const GROUPS = `block
  columns 3
  a:3
  block:group1:2
    columns 2
    h i j k
  end
  g
  block:group2:3
    %% columns auto (default)
    l m n o p q r
  end`;

// Narrow versus wide labels: the widest block in a column sets that column's width for every row.
const WIDTHS = `block
  columns 3
  a["Short"] b["A noticeably longer label"] c
  d e["Medium label"] f
  g h i`;

// columns 1 inside a group stacks its children vertically, so four blocks sit one above another.
const STACK = `block
  columns 2
  block
    columns 1
    a["A label"] b c d
  end
  wide["Beside the stack"]`;

// A server with services inside, a hierarchy of composites two levels deep.
const HIERARCHY = `block
  columns 2
  block:server:1
    columns 1
    title["Server"]
    block:services
      columns 2
      web api db cache
    end
  end
  block:client:1
    columns 1
    browser["Browser"] mobile["Mobile app"]
  end
  classDef svc fill:#2563eb,stroke:#93c5fd,color:#fff
  class web,api,db,cache svc`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Nested block', code: NESTED },
      { label: 'Groups with columns', code: GROUPS },
      { label: 'Widest block sets width', code: WIDTHS },
      { label: 'Vertical stack', code: STACK },
      { label: 'Server hierarchy', code: HIERARCHY },
    ],
  });

export default mount;
