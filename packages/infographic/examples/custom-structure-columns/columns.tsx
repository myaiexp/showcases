/** @jsxImportSource @antv/infographic */
// Columns: a plain grid whose column count and gap are props
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, Group, ItemsGroup } from '@antv/infographic';

export interface ColumnsProps extends BaseStructureProps {
  columns?: number;
  gap?: number;
}

export const Columns: ComponentType<ColumnsProps> = (props) => {
  const { Title, Item, data, columns = 2, gap = 20 } = props;
  const { title, desc, items = [] } = data;
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} />);

  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    itemElements.push(
      <Item
        indexes={[index]}
        datum={datum}
        data={data}
        x={(index % columns) * (itemBounds.width + gap)}
        y={Math.floor(index / columns) * (itemBounds.height + gap)}
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
