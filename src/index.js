//System
import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import { ContainerDnd } from './components/containerDnd';
import { ContainerMovable } from './components/containerMovable';
import { Dragger } from './components/dragger';
import { LineDragger } from './components/lineDragger';
import { Mover } from './components/mover';

//PropSpecs
import propsContainerDnd from './components/containerDnd/props';
import propsContainerMovable from './components/containerMovable/props';
import propsDragger from './components/dragger/props';
import propsLineDragger from './components/lineDragger/props';
import propsMover from './components/mover/props';

//Opus Lib
import Opus, { Component } from '@intenda/opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MyComponent = () => {
	return (
		<Component mda={{
			type: 'containerDnd',
			prps: { }
		}} />
	);
};

root.render(
	<Opus
		registerComponentTypes={[{
			type: 'containerDnd',
			component: ContainerDnd,
			propSpec: propsContainerDnd
		},
		{
			type: 'containerMovable',
			component: ContainerMovable,
			propSpec: propsContainerMovable
		},
		{
			type: 'dragger',
			component: Dragger,
			propSpec: propsDragger
		},
		{
			type: 'lineDragger',
			component: LineDragger,
			propSpec: propsLineDragger
		},
		{
			type: 'mover',
			component: Mover,
			propSpec: propsMover
		}]}
		startupComponent={<MyComponent />}
	/>
);
