// z.intersection(Person, Employee): both schemas must accept the value, outputs are merged
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Person = z.object({ name: z.string().min(1) });
const Employee = z.object({ role: z.enum(['dev', 'design', 'ops']) });
const EmployedPerson = z.intersection(Person, Employee);

const SAMPLES = [
  { label: 'name and role', value: { name: 'Ada', role: 'dev' } },
  { label: 'no role', value: { name: 'Ada' } },
  { label: 'no name', value: { role: 'ops' } },
  { label: 'neither fits', value: { name: '', role: 'chef' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remove either field: the schema that wanted it complains.' });
  objectLab(stage, [{ label: 'both', code: 'z.intersection(Person, Employee)  // Person: name, Employee: role', schema: EmployedPerson }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3]],
    inTitle: 'Staff record',
  });
  return stage.dispose;
};

export default mount;
