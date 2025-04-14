//Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

import Opus from '@intenda/opus-ui';
import './library';

//Sample
createRoot(document.getElementById('root'))
	.render(
		<Opus
			startupMda={{
				type: 'containerMovable',
				prps: { singlePage: true },
				wgts: [{
					type: 'mover',
					prps: {
						position: 'absolute',
						left: '100px',
						top: '100px'
					},
					wgts: [{
						type: 'label',
						prps: { cpt: 'Drag me' }
					}]
				}]
			}}
		/>
	);
