import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	*:focus{
		outline: 0;
	}

	html, body, #root {
		height: 100%;
	}

	body {
		-webkit-font-smoothing: antialiased;
	}

	body, input, button {
		font: 14px 'Roboto', sans-serif;
	}

	a {
		text-decoration: none;
	}

	ul {
		list-style: none;
	}

	button {
		cursor: pointer;
	}

	input {
		-webkit-outer-spin-button,
		-webkit-inner-spin-button {
			/* display: none; <- Crashes Chrome on hover */
			-webkit-appearance: none;
			margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
		}
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
	}
`;
