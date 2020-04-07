import React from 'react';
import { useGlobal } from '../hooks';
import RenderChildren from './RenderChildren';
import RenderField from './RenderField';

const FR = ({ id = '#', onItemChange, flatten }) => {
  const { displayType } = useGlobal();
  const item = flatten[id];
  const { schema } = item;

  const isObj = schema.type === 'object';
  const isList = schema.type === 'array' && schema.enum === undefined;
  const isComplex = isObj || isList;
  let containerClass = `fr-field w-100 ${isComplex ? 'fr-field-complex' : ''}`;
  let labelClass = 'fr-label mb2';
  let contentClass = 'fr-content';

  switch (schema.type) {
    case 'object':
      if (schema.title) {
        containerClass += ' ba b--black-20 pt4 pr3 pb2 relative mt3 mb4'; // object的margin bottom由内部元素撑起
        labelClass += ' fr-label-object bg-white absolute ph2 top-upper left-1'; // fr-label-object 无默认style，只是占位用于使用者样式覆盖
      }
      containerClass += ' fr-field-object'; // object的margin bottom由内部元素撑起
      if (schema.title) {
        contentClass += ' ml3'; // 缩进
      }
      break;
    case 'array':
      if (schema.title && !schema.enum) {
        labelClass += ' mt2 mb3';
      }
      break;
    case 'boolean':
      if (schema.title) {
        labelClass += ' ml2';
        labelClass = labelClass.replace('mb2', 'mb0');
      }
      contentClass += ' flex items-center'; // checkbox高度短，需要居中对齐
      containerClass += ' flex items-center flex-row-reverse justify-end';
      break;
    default:
      if (displayType === 'row') {
        labelClass = labelClass.replace('mb2', 'mb0');
      }
  }
  // 横排时
  if (displayType === 'row' && !isComplex && schema.type !== 'boolean') {
    containerClass += ' flex items-center';
    labelClass += ' flex-shrink-0 fr-label-row';
    labelClass = labelClass.replace('mb2', 'mb0');
    contentClass += ' flex-grow-1 relative';
  }

  // 横排的checkbox
  if (displayType === 'row' && schema.type === 'boolean') {
    contentClass += ' flex justify-end pr2';
  }

  const fieldProps = {
    item,
    onItemChange,
    labelClass,
    contentClass,
    isComplex,
  };
  const childrenProps = {
    flatten,
    children: item.children,
    onItemChange,
  };

  return (
    <div className={containerClass}>
      <RenderField {...fieldProps} />
      {item.children && item.children.length > 0 ? (
        <ul className={`${id === '#' ? 'pl0' : 'pl3'}`}>
          <RenderChildren {...childrenProps} />
        </ul>
      ) : null}
    </div>
  );
};

export default FR;