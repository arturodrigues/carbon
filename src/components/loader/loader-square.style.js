import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';

const loaderAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledLoaderSquare = styled.div`
  ${({
    theme, size, isInsideButton, state
  }) => css`
    animation: ${loaderAnimation} 1s infinite ease-in-out both;
    background-color: ${theme.colors.primary};
    display: inline-block;
    height: ${size === 'large' ? '16px' : '8px'};
    width: ${size === 'large' ? '16px' : '8px'};
    margin-right: ${size === 'large' ? '10px' : '6px'};

    ${isInsideButton && css`
      background-color: ${state === 'off' ? theme.colors.border : theme.colors.white};
    `}

    &:nth-of-type(1) {
      animation-delay: 0s;
    }

    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
      margin-right: 0px;
    }
  `}
`;

StyledLoaderSquare.defaultProps = {
  theme: baseTheme,
  size: 'small',
  isInsideButton: false
};

StyledLoaderSquare.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  isInsideButton: PropTypes.bool
};

export default StyledLoaderSquare;
