import React from 'react';
import '../styles/Home.scss';

export const Home = () => {
	return (
		<div className='home'>
			<div className='container'>
				<div className='myself'>
					<h3 className='subtitle'>Welcome to my world</h3>
					<div className='img-container'></div>

					<h3>Hi, I'm Alejandro Trejo</h3>

					{/* <div> */}
					<h1 className='title rwiting'>Web Developer</h1>
					{/* </div> */}
					<p>
						I'm a Front-end Angular & IONIC Developer based in
						Venezuela.
					</p>
				</div>
			</div>
		</div>
	);
};
