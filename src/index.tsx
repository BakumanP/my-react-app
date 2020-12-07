import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';

if ((module as any).hot) (module as any).hot.accept();
ReactDOM.render(<App name="hello" />, document.getElementById('root'));
