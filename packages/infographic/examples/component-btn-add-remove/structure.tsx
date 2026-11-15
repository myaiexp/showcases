/** @jsxImportSource @antv/infographic */
// A row structure with a BtnsGroup of add and remove buttons
import { BtnAdd, BtnRemove, BtnsGroup, FlexLayout, Group, ItemsGroup, getElementBounds, registerStructure } from '@antv/infographic';
import type { BaseStructureProps, JSXElement } from '@antv/infographic';

export const STRUCTURE = 'showcase-component-buttons';

const ButtonRow = (props: BaseStructureProps & { gap?: number }) => {
  const { Title, Item, data, gap = 40 } = props;
  const { title, desc, items = [] } = data;
  const first = items[0];
  if (!first) return <Group />;
  const bounds = getElementBounds(<Item indexes={[0]} data={data} datum={first} />);
  const buttons: JSXElement[] = [];
  items.forEach((_, index) => {
    const x = index * (bounds.width + gap);
    // The same indexes the item has: the editor reads them to know what to add or remove.
    buttons.push(<BtnRemove indexes={[index]} x={x + bounds.width - 20} y={-26} />);
    buttons.push(<BtnAdd indexes={[index]} x={x - gap / 2 - 10} y={bounds.height + 8} />);
  });
  buttons.push(<BtnAdd indexes={[items.length]} x={items.length * (bounds.width + gap) - gap / 2 - 10} y={bounds.height + 8} />);
  return (
    <FlexLayout flexDirection="column" alignItems="center" gap={20}>
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <ItemsGroup>
          {items.map((datum, index) => (
            <Item indexes={[index]} datum={datum} data={data} x={index * (bounds.width + gap)} />
          ))}
        </ItemsGroup>
        <BtnsGroup>{buttons}</BtnsGroup>
      </Group>
    </FlexLayout>
  );
};

registerStructure(STRUCTURE, { component: ButtonRow as never, composites: ['title', 'item'] });
