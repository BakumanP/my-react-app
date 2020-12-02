import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
// import { removeClass, removeElement, setTagTitle } from '@/utils/domLib';
// import env from '@/constants/env';
// import 'antd/dist/antd.less';
// import '@/styles/index.less';

if ((module as any).hot) (module as any).hot.accept();

// // debug
// if (isDev) {
//   // // why-did-you-render
//   // const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   // whyDidYouRender(React, { include: [/^./], collapseGroups: true }); // rewrite you want here
// }

// page onLoaded
// removeClass(document.getElementById('body'), 'body-loading');
// removeElement(document.getElementById('sk-cube-grid'));
// setTagTitle(env.APP_NAME);
// mount react-dom
ReactDOM.render(<App />, document.getElementById('root'));
