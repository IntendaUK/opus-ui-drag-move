/*eslint-disable max-len */

//React
import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

//System
import { createContext, fixScopeIds } from 'opus-ui';

//External Helpers
import { setDisabled as setDisabledMoveManager } from '../containerMovable/moveManager';
import { setDisabled as setDisabledDragManager } from '../containerDnd/dragManager';

//Styles
import './styles.css';

//Context
const LineDraggerContext = createContext('lineDragger');

//Events
const onDragStart = ({ id, setState, state: { elContainer } }, e) => {
	setDisabledMoveManager(true);
	setDisabledDragManager(true);

	document.getElementById(e.target.id).style.opacity = 0;

	e.dataTransfer.setData('idSource', id);

	const containerRect = elContainer.getBoundingClientRect();
	const elScale = containerRect.width / elContainer.offsetWidth;

	setState({
		dragging: true,
		xFrom: (e.clientX - containerRect.x) / elScale,
		yFrom: (e.clientY - containerRect.y) / elScale,
		deleteKeys: ['idTarget']
	});
};

const onDrag = ({ state: { elContainer } }, setToPos, e) => {
	const containerRect = elContainer.getBoundingClientRect();
	const elScale = containerRect.width / elContainer.offsetWidth;

	setToPos({
		x: (e.clientX - containerRect.x) / elScale,
		y: (e.clientY - containerRect.y) / elScale
	});
};

const onDragEnd = ({ setState }) => {
	setDisabledMoveManager(false);
	setDisabledDragManager(false);

	setState({ dragging: false });
};

const onDrop = ({ id, setWgtState }, e) => {
	const idSource = e.dataTransfer.getData('idSource');

	setWgtState(idSource, { idTarget: id });
};

//Components
const styleSvgDiv = {
	position: 'absolute',
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
	pointerEvents: 'none',
	overflow: 'hidden'
};

const styleSvg = {
	width: '100%',
	height: '100%'
};

const styleLine = {
	stroke: 'rgb(255, 0, 0)',
	strokeWidth: 2
};

const Line = React.memo(({ toPos }) => {
	const { state: { dragging, xFrom, yFrom, elContainer } } = useContext(LineDraggerContext);

	const { x: xTo, y: yTo } = toPos;

	if (!dragging || xTo === undefined)
		return null;

	const res = (
		<div style={styleSvgDiv}>
			<svg style={styleSvg}>
				<line
					style={styleLine}
					x1={`${xFrom}px`}
					y1={`${yFrom}px`}
					x2={`${xTo}px`}
					y2={`${yTo}px`}
				/>
			</svg>
		</div>
	);

	return ReactDOM.createPortal(res, elContainer);
}, (a, b) => {
	return (a.toPos.x === b.toPos.x && a.toPos.y === b.toPos.y);
});

const onMount = ({ id, setState, state: { renderTargetSelector } }) => {
	let useId = renderTargetSelector;
	if (useId.includes('||'))
		useId = fixScopeIds(useId, { ownerId: id });

	const elContainer = document.querySelector(useId);

	setState({ elContainer });
};

export const LineDragger = props => {
	const { id, getHandler, classNames, style, attributes } = props;

	const [toPos, setToPos] = useState({});

	useEffect(getHandler(onMount), []);

	const handlerOnDragStart = getHandler(onDragStart);
	const handlerOnDrag = getHandler(onDrag, setToPos);
	const handlerOnDragEnd = getHandler(onDragEnd);
	const handlerOnDrop = getHandler(onDrop);

	return (
		<LineDraggerContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
				draggable
				onDragStart={handlerOnDragStart}
				onDrag={handlerOnDrag}
				onDragEnd={handlerOnDragEnd}
				onDrop={handlerOnDrop}
			>
				<Line toPos={toPos} />
			</div>
		</LineDraggerContext.Provider>
	);
};
