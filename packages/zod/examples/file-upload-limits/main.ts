// z.file().max().mime(): sizes and types of File objects made in code
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

// An avatar: at most 500 kB, PNG or JPEG.
const Avatar = z.file().max(500_000).mime(['image/png', 'image/jpeg']);

const make = (name: string, type: string, bytes: number): File => new File([new Uint8Array(bytes)], name, { type });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const SAMPLES = [
    { label: 'small PNG', value: make('me.png', 'image/png', 120_000) },
    { label: 'huge JPEG', value: make('holiday.jpg', 'image/jpeg', 3_200_000) },
    { label: 'a PDF', value: make('cv.pdf', 'application/pdf', 40_000) },
    { label: 'just a name', value: 'me.png' },
  ];
  objectLab(stage, [{ label: 'avatar', code: "z.file().max(500_000).mime(['image/png', 'image/jpeg'])", schema: Avatar }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3]],
    inTitle: 'File',
    editor: false,
  });
  return stage.dispose;
};

export default mount;
