/** @jsxImportSource @antv/infographic */
// A small row structure whose items sit in an ItemsGroup
import { FlexLayout, Group, ItemsGroup, getElementBounds, registerStructure } from '@antv/infographic';
import type { BaseStructureProps } from '@antv/infographic';

export const STRUCTURE = 'showcase-component-items-group';

const ItemsRow = (props: BaseStructureProps & { gap?: number }) => {
  const { Title, Item, data, gap = 24 } = props;
  const { title, desc, items = [] } = data;
  const first = items[0];
  if (!first) return <Group />;
  const itemWidth = getElementBounds(<Item indexes={[0]} data={data} datum={first} />).width;
  return (
    <FlexLayout flexDirection="column" alignItems="center" gap={20}>
      {Title ? <Title title={title} desc={desc} /> : null}
      <ItemsGroup>
        {items.map((datum, index) => (
          <Item indexes={[index]} datum={datum} data={data} x={index * (itemWidth + gap)} />
        ))}
      </ItemsGroup>
    </FlexLayout>
  );
};

registerStructure(STRUCTURE, { component: ItemsRow as never, composites: ['title', 'item'] });
