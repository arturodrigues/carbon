import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Switch from '.';
import { info, legacyInfo, notes } from './documentation';
import classic from '../../../style/themes/classic';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Switch.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /switch\.component(?!spec)/
);

const formStore = new Store({
  checked: false
});

const trueBool = true;
const stores = {};
const validationTypes = ['cookies', 't&cs', 'info'];

validationTypes.forEach((type) => {
  stores[type] = new Store({
    checked: false,
    forceUpdateTriggerToggle: false
  });
});

const SwitchWrapper = (props) => {
  return (
    <State store={ props.store }>
      <Switch
        onChange={ handleChange() }
        name='switch'
        { ...props }
      />
    </State>
  );
};

SwitchWrapper.propTypes = {
  store: PropTypes.object
};

SwitchWrapper.defaultProps = {
  store: formStore
};

storiesOf('Experimental/Switch', module)
  .add('classic', () => (
    <SwitchWrapper
      { ...commonKnobs() }
      theme={ classic }
    />
  ), {
    info: {
      text: legacyInfo,
      propTables: [Switch],
      propTablesExclude: [State, SwitchWrapper],
      excludedPropTypes: ['children', 'disabled', 'size', 'theme']
    },
    notes: { markdown: notes }
  })
  .add('default', () => (
    <SwitchWrapper
      { ...commonKnobs() }
      { ...dlsKnobs() }
    />
  ), {
    info: {
      text: info,
      propTables: [Switch],
      propTablesExclude: [State, SwitchWrapper],
      excludedPropTypes: ['children', 'theme']
    },
    notes: { markdown: notes }
  })
  .add('validations', () => (
    <>
      {validationTypes.map(type => (
        <SwitchWrapper
          { ...commonKnobs() }
          { ...dlsKnobs() }
          key={ `key-${type}` }
          name={ `switch-${type}` }
          label={ `Accept ${type}` }
          value={ type }
          store={ stores[type] }
          onChange={ handleChange(stores[type]) }
          validations={ testValidation('valid') }
          warnings={ testValidation('warn') }
          info={ testValidation('info') }
          unblockValidation={ trueBool }
          useValidationIcon={ trueBool }
        />
      ))}
    </>
  ));

function handleChange(store = formStore) {
  return function (ev) {
    const { checked } = ev.target;

    store.set({ checked, forceUpdateTriggerToggle: checked });
    action('checked')(checked);
  };
}

function commonKnobs() {
  return ({
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    label: text('label', 'Switch on this component?'),
    labelHelp: text('labelHelp', 'Switch off and on this component.'),
    labelInline: boolean('labelInline', Switch.defaultProps.labelInline),
    loading: boolean('loading', false),
    inputWidth: number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }),
    labelWidth: number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }),
    labelAlign: select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ),
    reverse: boolean('reverse', Switch.defaultProps.reverse),
    value: text('value', 'test-value')
  });
}

function dlsKnobs() {
  return {
    disabled: boolean('disabled', false),
    size: select('size', OptionsHelper.sizesBinary, 'small')
  };
}

function testValidation(type) {
  return (value, { checked }) => {
    return new Promise((resolve, reject) => {
      if (type === 'valid' && value === 'cookies' && !checked) {
        reject(new Error('Show error!'));
      } else if (type === 'warn' && value === 't&cs' && !checked) {
        reject(new Error('Show warning!'));
      } else if (type === 'info' && value === 'info' && !checked) {
        reject(new Error('Show info!'));
      } else {
        resolve();
      }
    });
  };
}