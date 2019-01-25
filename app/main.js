// const greeter=require('./Greeter.js');
// document.querySelector('#root').appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import './main.css';

if (module.hot) {
  console.log(module.hot)
  // 实现热更新
  module.hot.accept();
}
render(<Greeter />,document.getElementById('root'));
