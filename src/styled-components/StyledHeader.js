import styled from 'styled-components';

export const StyledHeader = styled.header`
	width: 100%;
	/* position: absolute;
	top: 0;
	z-index: 999; */

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 3rem;

		.logo {
			font-size: 2.5rem;
			font-family: 'sofia sans', sans-serif;
			color: var(--green);
			text-decoration: none;
			text-transform: uppercase;

			span {
				font-size: 3.5rem;
				font-weight: bold;
			}
		}

		.navigation {
			display: flex;

			li {
				list-style: none;
				margin: 0 2.5rem 0 0;

				background: transparent;

				a {
					padding: 1.2rem;
					border-radius: 0.6rem;
					font-size: 1.4rem;
					text-transform: uppercase;
					color: var(--font);
					text-decoration: none;
					transition: all 0.5s;

					&:hover {
						background: #c4cfde41;
					}
				}
			}
		}
	}
`;
