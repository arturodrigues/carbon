import { noTheme, classicTheme, carbonThemeList } from '../src/style/themes';

/** These are for use with https://www.npmjs.com/package/storybook-addon-styled-component-theme */

export const dlsThemeSelector = {
  themes: [...carbonThemeList, noTheme],
  buttonAttributes: ['data-theme']
};

export const classicThemeSelector = {
  themes: [classicTheme],
  singleThemeMessage: 'The theme has been locked to Classic for this story.',
  showSingleThemeButton: false
};
