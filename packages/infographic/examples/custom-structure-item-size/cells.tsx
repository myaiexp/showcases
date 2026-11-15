/** @jsxImportSource @antv/infographic */
// Cells: a row of items, each given the same width and height
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, Group, ItemsGroup } from '@antv/infographic';

export interface CellsProps extends BaseStructureProps {
  size?: number;
  gap?: number;
}

export const Cells: ComponentType<CellsProps> = (props) => {
  const { Title, Item, data, size = 120, gap = 16 } = props;
  const { title, desc, items = [] } = data;
  // Props the Item does not know are passed on to the item's own props: circle-node reads width and height.
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} width={size} height={size} />);

  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    itemElements.push(
      <Item
        indexes={[index]}
        datum={datum}
        data={data}
        width={size}
        height={size}
        x={index * (itemBounds.width + gap)}
      />,
    );
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
