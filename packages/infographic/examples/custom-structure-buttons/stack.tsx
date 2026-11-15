/** @jsxImportSource @antv/infographic */
// Stack: a vertical list with an add button between items and a remove beside each
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { BtnAdd, BtnRemove, BtnsGroup, FlexLayout, getElementBounds, Group, ItemsGroup } from '@antv/infographic';

export interface StackProps extends BaseStructureProps {
  gap?: number;
}

export const Stack: ComponentType<StackProps> = (props) => {
  const { Title, Item, data, gap = 20 } = props;
  const { title, desc, items = [] } = data;
  const btn = getElementBounds(<BtnAdd indexes={[0]} />);
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} />);

  const itemElements: JSXElement[] = [];
  const btnElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    const y = index * (itemBounds.height + gap);
    itemElements.push(<Item indexes={[index]} datum={datum} data={data} y={y} />);
    // Remove: beside the item. Add: in the gap above it (indexes is the insert position).
    btnElements.push(
      <BtnRemove indexes={[index]} x={itemBounds.width + 8} y={y + (itemBounds.height - btn.height) / 2} />,
    );
    btnElements.push(
      <BtnAdd indexes={[index]} x={(itemBounds.width - btn.width) / 2} y={y - (gap + btn.height) / 2} />,
    );
  });
  if (items.length > 0) {
    // One more add button after the last item.
    btnElements.push(
      <BtnAdd
        indexes={[items.length]}
        x={(itemBounds.width - btn.width) / 2}
        y={items.length * (itemBounds.height + gap) - gap + (gap - btn.height) / 2}
      />,
    );
  }

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
        <BtnsGroup>{btnElements}</BtnsGroup>
      </Group>
    </FlexLayout>
  );
};
