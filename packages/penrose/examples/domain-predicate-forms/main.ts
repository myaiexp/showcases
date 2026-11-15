// Four predicate declaration forms: unnamed, named, zero and three arguments
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    domain: `type FirstType
type SecondType

predicate P1 (FirstType, SecondType)
predicate P2 (SecondType a1, SecondType a2)
predicate P3 ()
predicate P4 (FirstType, SecondType, SecondType)
`,
    substance: `FirstType F
SecondType S1, S2
P1(F, S1)
P2(S1, S2)
P3()
P4(F, S1, S2)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall FirstType x {
  x.icon = Circle {
    r : 36
    strokeWidth : 3.0
    fillColor : #f2b531
  }
  x.text = Text {
    string : x.label
    center : x.icon.center
    fontSize : "30px"
  }
}

forall SecondType x {
  x.icon = Rectangle {
    width : 72
    height : 72
    strokeWidth : 3.0
    fillColor : #5fb3d9
  }
  x.text = Text {
    string : x.label
    center : x.icon.center
    fontSize : "30px"
  }
}

-- P1(FirstType, SecondType) draws a line
forall FirstType a; SecondType b
where P1(a, b) {
  a.p1 = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 3.0
    strokeColor : #555555
  }
  layer a.p1 below a.icon
  layer a.p1 below b.icon
}

-- P2 has named arguments
forall SecondType a; SecondType b
where P2(a, b) {
  override a.icon.fillColor = #8fd19e
  override b.icon.fillColor = #e28fa9
  ensure vdist(a.icon.center, b.icon.center) > 150
}

-- P4 takes three arguments: the first object turns green
forall FirstType a; SecondType b; SecondType c
where P4(a, b, c) {
  override a.icon.fillColor = #8fd19e
}

-- P3() has no arguments: it holds for the whole diagram, so any block can ask for it
forall FirstType a
where P3() {
  override a.icon.strokeColor = #c0392b
  override a.icon.strokeWidth = 8.0
}
`,
  });
  return () => stage.dispose();
};

export default mount;
