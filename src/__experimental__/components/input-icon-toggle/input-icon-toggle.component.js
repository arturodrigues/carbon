import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon/icon';
import InputIconToggleStyle from './input-icon-toggle.style';

/**
 * An InputIconToggle Component.
 *
 * == How to use an InputIconToggle in a component:
 *
 * In your file
 *
 *   import InputIconToggle from 'carbon-react/lib/components/input-icon-toggle';
 *
 * To render an InputIconToggle:
 *
 *   <InputIconToggle
 *      content=''
 *      iconType='foo'
 *      inputId='bar'
 *    />
 *
 * Component has to be placed next to an input element, inputId prop must be the same as the id of that input.
 */
const InputIconToggle = (props) => {
  const {
    iconType,
    content,
    disabled,
    readonly,
    ...styleProps
  } = props;

  if (disabled || readonly) return null;

  return (
    <InputIconToggleStyle key='label-icon' { ...styleProps }>
      {content || <Icon type={ iconType } />}
    </InputIconToggleStyle>
  );
};

InputIconToggle.propTypes = {
  /**
   * Optional content to be rendered instead of an icon, when empty a simple icon will be rendered
   */
  content: PropTypes.node,
  /**
   * Disabled state of the input
   */
  disabled: PropTypes.bool,
  /**
   * Readonly state of the input
   */
  readonly: PropTypes.bool,
  /**
   * Type of an icon to render
   */
  iconType: PropTypes.string
};

export default InputIconToggle;
