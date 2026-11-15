// A collector runs once per (course, room) pair over that course's students
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Student
type Course
type Room
predicate Takes(Student, Course)
predicate Held(Course, Room)
`,
    substance: `Student s1, s2, s3, s4, s5
Course Math, Art, Biology
Room R1, R2
Takes(s1, Math)
Takes(s2, Math)
Takes(s3, Math)
Takes(s4, Art)
Takes(s1, Biology)
Takes(s5, Biology)
Held(Math, R1)
Held(Art, R1)
Held(Biology, R2)
AutoLabel Math, Art, Biology, R1, R2
NoLabel s1, s2, s3, s4, s5
`,
    style: `canvas {
  width = 640
  height = 340
}

collect Student st into students
where Takes(st, c); Held(c, r)
foreach Course c; Room r {
  y = 100 - 90 * (match_id - 1)
  w = 110 * numberof students
  c.bar = Rectangle {
    center : (0 - 230 + w / 2, y)
    width : w
    height : 40
    fillColor : rgba(0.4, 0.65, 0.5, 0.85)
    strokeWidth : 0.0
  }
  c.caption = Text {
    string : c.label + " in " + r.label
    center : (0 - 230 + w / 2, y)
    fontSize : "22px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
