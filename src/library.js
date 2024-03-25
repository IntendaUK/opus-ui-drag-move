//Opus
import { registerComponentTypes } from 'opus-ui';

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

//Helpers
registerComponentTypes([{
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
}]);

//Exports
export {
	getDragger, setTrackOnly, isTrackOnly, isDisabled
} from './components/containerMovable/moveManager';
