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
				type: 'containerSimple',
				prps: {
					singlePage: true,
					backgroundColor: 'lightGrey'
				},
				wgts: [{
					id: 'cnt1',
					type: 'containerDnd',
					prps: {
						dragTargets: ['self', 'cnt2'],
						borderBottom: '1px solid red'
					},
					wgts: [{
						type: 'dragger',
						wgts: [{
							type: 'label',
							prps: { cpt: '[1.1] Drag me' }
						}]
					}, {
						type: 'dragger',
						wgts: [{
							type: 'label',
							prps: { cpt: '[1.2] Drag me' }
						}]
					}]
				},
				{
					id: 'cnt2',
					type: 'containerDnd',
					prps: { dragTargets: ['cnt1', 'self'] },
					wgts: [{
						type: 'dragger',
						wgts: [{
							type: 'label',
							prps: { cpt: '[2.1] Drag me' }
						}]
					}, {
						type: 'dragger',
						wgts: [{
							type: 'label',
							prps: { cpt: '[2.2] Drag me' }
						}]
					}]
				}]
			}}
		/>
	);
