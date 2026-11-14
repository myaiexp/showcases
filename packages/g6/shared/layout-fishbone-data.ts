// The Quality fishbone tree from the Fishbone docs page
import type { TreeData } from '@antv/g6';

export const quality: TreeData = {
  id: 'Quality',
  children: [
    {
      id: 'Machine',
      children: [{ id: 'Mill' }, { id: 'Mixer' }, { id: 'Metal Lathe', children: [{ id: 'Milling' }] }],
    },
    { id: 'Method' },
    {
      id: 'Material',
      children: [
        {
          id: 'Masonite',
          children: [
            { id: 'spearMint' },
            { id: 'pepperMint', children: [{ id: 'test3' }] },
            { id: 'test1', children: [{ id: 'test4' }] },
          ],
        },
        { id: 'Marscapone', children: [{ id: 'Malty' }, { id: 'Minty' }] },
        { id: 'Meat', children: [{ id: 'Mutton' }] },
      ],
    },
    {
      id: 'Man Power',
      children: [
        { id: 'Manager' },
        { id: "Master's Student" },
        { id: 'Magician' },
        { id: 'Miner' },
        { id: 'Magister', children: [{ id: 'Malpractice' }] },
        { id: 'Massage Artist', children: [{ id: 'Masseur' }, { id: 'Masseuse' }] },
      ],
    },
    { id: 'Measurement', children: [{ id: 'Malleability' }] },
    { id: 'Milieu', children: [{ id: 'Marine' }] },
  ],
};
