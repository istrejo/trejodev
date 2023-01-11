import React from 'react';

import { StyledHeader } from '../styled-components/StyledHeader.js';

const navigationItems = [
	{
		title: 'Home',
		id: 1,
	},
	{
		title: 'About',
		id: 2,
	},
	{
		title: 'Portfolio',
		id: 3,
	},
	{
		title: 'Skills',
		id: 4,
	},
	{
		title: 'Contact',
		id: 5,
	},
];

export const Header = () => {
	return (
		<StyledHeader>
			<nav>
				<a className='logo'>
					{' '}
					<span>T</span>rejoDev
				</a>
				<ul className='navigation'>
					{navigationItems.map(item => (
						<li key={item.id}>
							<a href=''>{item.title}</a>
						</li>
					))}
				</ul>
			</nav>
		</StyledHeader>
	);
};
