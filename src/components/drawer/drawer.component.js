import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import createGuid from '../../utils/helpers/guid';
import Icon from '../icon';

import {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledIconButton,
  StyledDrawerChildren,
  StyledDrawerSidebar
} from './drawer.style';

const Drawer = ({
  defaultExpanded,
  expanded,
  onChange,
  children,
  expandedWidth,
  sidebar,
  animationSpeed,
  ...props
}) => {
  const isControlled = expanded !== undefined;
  const [isExpandedInternal, setIsExpandedInternal] = useState(defaultExpanded || false);
  const [isFirstOpen, setFirstOpen] = useState(true);
  const isExpanded = isControlled ? expanded : isExpandedInternal;
  const toggleDrawer = useCallback((ev) => {
    if (!isControlled) setIsExpandedInternal(!isExpanded);
    if (onChange) onChange(ev, !isExpanded);
    setFirstOpen(false);
  }, [isControlled, isExpanded, onChange]);

  const closedClass = isFirstOpen ? '' : 'closed';
  const guid = useRef(createGuid());
  const sidebarId = `DrawerSidebar_${guid.current}`;

  return (
    <StyledDrawerWrapper
      data-element='drawer'
      { ...props }
    >
      <StyledDrawerContent
        expandedWidth={ expandedWidth }
        animationSpeed={ animationSpeed }
        className={ isExpanded ? 'open' : closedClass }
      >
        <StyledIconButton
          aria-label='toggle sidebar'
          aria-expanded={ isExpanded }
          aria-controls={ sidebarId }
          data-element='drawer-toggle'
          onAction={ toggleDrawer }
          isExpanded={ isExpanded }
          animationSpeed={ animationSpeed }
        >
          <Icon type='chevron_right' />
        </StyledIconButton>
        <StyledDrawerSidebar id={ sidebarId } role='navigation'>
          { sidebar }
        </StyledDrawerSidebar>
      </StyledDrawerContent>
      <StyledDrawerChildren>
        {children}
      </StyledDrawerChildren>
    </StyledDrawerWrapper>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  /** Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled */
  defaultExpanded: PropTypes.bool,
  /** Sets the expansion state of the Drawer if component is meant to be used as controlled */
  expanded: PropTypes.bool,
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange: PropTypes.func,
  /* Sidebar object either html or react component */
  sidebar: PropTypes.node,
  /* The (% or px) width of the expanded sizebar  */
  expandedWidth: PropTypes.string,
  /** Duration of a animation */
  animationSpeed: PropTypes.string
};

Drawer.defaultProps = {
  expandedWidth: '40%',
  animationSpeed: '400ms'
};

export default Drawer;
