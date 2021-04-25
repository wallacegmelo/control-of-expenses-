const html = document.querySelector('html');
const checkbox = document.querySelector('input[name=theme]');

const getStyle = (element, style) => {
  return getComputedStyle(element).getPropertyValue(style);
};

const lightMode = {
  bg: getStyle(html, '--bg'),
  border: getStyle(html, '--border'),
  primaryColor: getStyle(html, '--primary-color'),
  bgPanel: getStyle(html, '--bg-panel'),
  boxShadowTemplate: getStyle(html, '--box-shadow-template'),
  colorText: getStyle(html, '--color-text')
};

const darkMode = {
  bg: '#1b1a17',
  primaryColor: '#1e6f5c',
  border: 'rgba(255, 255, 255, 0.15)',
  bgPanel: '#434343',
  boxShadowTemplate: '0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24)',
  colorText: '#FCFCFC'
};

const transformKey = key => `--${key.replace(/([A-Z])/, '-$1').toLowerCase()}`;

const changeTheme = (theme) => {
  Object.keys(theme).map(key => {
    html.style.setProperty(transformKey(key), theme[key]);
  });
};

checkbox.addEventListener('change', ({ target }) => {
  target.checked ? changeTheme(darkMode) : changeTheme(lightMode);
});