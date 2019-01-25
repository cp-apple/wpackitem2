// let config=require('./config.json');

// module.exports=function(){
// 	let greet=document.createElement('div');
// 	greet.textContent=config.greetText;
// 	// greet.textContent='Hi,there and greetings!';
// 	return greet;
// };

import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';

class Greeter extends Component{
	render() {
		return (
			<div className={styles.rootCon}> 
				使用cssModule添加类名的方法 <br/>
				{config.greetText}
			</div>
		);
	}
}

export default Greeter