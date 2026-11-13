// Class diagram comments and the four direction values
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A comment sits on its own line; everything after %% on it is ignored, even class syntax.
const COMMENTS = `classDiagram
%% This whole line is a comment classDiagram class Hidden <<interface>>
class Shape{
    <<interface>>
    noOfVertices
    draw()
}
%% Square --|> Shape would add a subclass, but it is switched off
class Circle
Circle --|> Shape`;

const BODY = `  class Student {
    -idCard : IdCard
  }
  class IdCard{
    -id : int
    -name : string
  }
  class Bike{
    -id : int
    -name : string
  }
  Student "1" --o "1" IdCard : carries
  Student "1" --o "1" Bike : rides`;

const dir = (d: string): string => `classDiagram\n  direction ${d}\n${BODY}`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Comments', code: COMMENTS },
      // direction sets the way the diagram runs: TB, BT, LR or RL.
      { label: 'direction TB', code: dir('TB') },
      { label: 'direction BT', code: dir('BT') },
      { label: 'direction LR', code: dir('LR') },
      { label: 'direction RL', code: dir('RL') },
    ],
  });

export default mount;
