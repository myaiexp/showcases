/** @jsxImportSource @antv/infographic */
// ValueCard: a rounded card with a label and an optional big value
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { FlexLayout, getElementBounds, getItemProps, Group, ItemLabel, ItemValue, Rect } from '@antv/infographic';

export interface ValueCardProps extends BaseItemProps {
  width?: number;
}

export const ValueCard: ComponentType<ValueCardProps> = (props) => {
  // The second argument names the custom props to keep out of restProps.
  const [{ indexes, datum, themeColors, width = 160 }, restProps] = getItemProps(props, ['width']);
  const pad = 14;

  const content = (
    <FlexLayout x={pad} y={pad} flexDirection="column" gap={6}>
      <ItemLabel indexes={indexes} width={width - pad * 2} fill={themeColors.colorTextSecondary} fontSize={14}>
        {datum.label}
      </ItemLabel>
      {/* value can be undefined: draw it only when it is a number. */}
      {typeof datum.value === 'number' ? (
        <ItemValue indexes={indexes} value={datum.value} fontSize={30} fill={themeColors.colorPrimary} />
      ) : null}
    </FlexLayout>
  );
  const bounds = getElementBounds(content);

  return (
    <Group {...restProps}>
      <Rect
        width={width}
        height={bounds.height + pad * 2}
        rx={12}
        fill={themeColors.colorBgElevated}
        stroke={themeColors.colorPrimary}
        strokeWidth={1.5}
        data-element-type="shape"
      />
      {content}
    </Group>
  );
};
