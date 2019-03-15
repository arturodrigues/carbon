import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  number,
  select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Flash from './flash';
import Button from '../button';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

const store = new Store({
  open: false
});

const dismissHandler = () => {
  store.set({ open: false });
  action('cancel')();
};

const openHandler = () => {
  store.set({ open: true });
  action('open')();
};

storiesOf('Flash', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State]
    }
  })
  .add('default', () => {
    const as = select('as', OptionsHelper.colors);
    const message = text('message', 'This is a flash message');
    const timeout = number('timeout', 0);

    return (
      <div>
        <Button onClick={ openHandler }>Open Flash</Button>
        <State store={ store }>
          <Flash
            open={ store.get('open') }
            as={ as }
            message={ message }
            timeout={ timeout }
            onDismiss={ dismissHandler }
          />
        </State>
      </div>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A Flash widget.</p>

          <StoryHeader>How to use an Flash in a component:</StoryHeader>

          <p>
            {"Flash is rendered in two sections: a ventral message 'flash', and a dorsal coloured 'slider'."}
          </p>

          <p>In your file</p>

          <StoryCode padded>
            {'import Flash from "carbon-react/lib/components/flash";'}
          </StoryCode>

          <p>To render a Flash, setup open and cancel handlers in your view to trigger the message on and off:</p>

          <StoryCode padded>
            {'<Flash open={ openStatus } onDismiss={ myOnDismiss } message="Alert!" />'}
          </StoryCode>

          <p>By default, the flash renders with a clickable close icon that hooks up with the onDismiss unction.</p>

          <p>To instead have the flash disappear after a given time period, pass a prop of timeout in milliseconds.</p>

          <StoryCode padded>
            {'<Flash open={ openStatus } onDismiss={ myOnDismiss } message="Alert!" timeout={ 2000 }/>'}
          </StoryCode>

          <p>The flash message can be formatted in the following ways:</p>

          <ul>
            <li>
              {'A string: "Alert"'}
            </li>
            <li>
              {'An array: ["Message One", "Message Two"]'}
            </li>
            <li>An object with description: <StoryCode>{'{ description: "My description" }'}</StoryCode></li>
            <li>
              <span>An object of key/value pairs:</span>
              <StoryCode>{'{ first_name: "is required", last_name: "is required" }'}</StoryCode>
            </li>
            <li>An object with description and nested key/value pairs:</li>
          </ul>

          <StoryCode padded>
            {'{ description: { first_name: "is required", last_name: "is required" } }'}
          </StoryCode>

          <p>
            {"If a message is too long, it can be proxied to a dialog by adding 'more' in your description."}
          </p>

          <StoryCode padded>
            {'let message = "This is too long ::more:: This sentence is proxied to a dialog."'}
          </StoryCode>
        </div>
      )
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
