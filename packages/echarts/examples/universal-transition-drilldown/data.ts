// Three levels of nested categories, each item naming the group of its children

export interface Item {
  name: string;
  value: number;
  /** The group this item belongs to: matches its parent's childGroupId. */
  groupId: string;
  /** The group its children carry; absent on leaves. */
  childGroupId?: string;
}

/** Levels keyed by group id: 'things' is the root. */
export const LEVELS: Record<string, Item[]> = {
  things: [
    { name: 'Animals', value: 12, groupId: 'things', childGroupId: 'animals' },
    { name: 'Fruits', value: 9, groupId: 'things', childGroupId: 'fruits' },
    { name: 'Cars', value: 6, groupId: 'things', childGroupId: 'cars' },
  ],
  animals: [
    { name: 'Dogs', value: 5, groupId: 'animals', childGroupId: 'dogs' },
    { name: 'Cats', value: 4, groupId: 'animals' },
    { name: 'Birds', value: 3, groupId: 'animals' },
  ],
  fruits: [
    { name: 'Apples', value: 4, groupId: 'fruits' },
    { name: 'Pears', value: 3, groupId: 'fruits' },
    { name: 'Plums', value: 2, groupId: 'fruits' },
  ],
  cars: [
    { name: 'Sedans', value: 3, groupId: 'cars' },
    { name: 'Vans', value: 2, groupId: 'cars' },
    { name: 'Coupes', value: 1, groupId: 'cars' },
  ],
  dogs: [
    { name: 'Corgi', value: 1, groupId: 'dogs' },
    { name: 'Bulldog', value: 2, groupId: 'dogs' },
    { name: 'Shiba Inu', value: 2, groupId: 'dogs' },
  ],
};

/** Each group's parent group, for the way back up. */
export const PARENT: Record<string, string> = {};
for (const [group, items] of Object.entries(LEVELS)) {
  for (const item of items) if (item.childGroupId) PARENT[item.childGroupId] = group;
}
