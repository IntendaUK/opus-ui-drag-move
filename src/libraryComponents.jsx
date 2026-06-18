import React, { useState, useRef, useEffect } from 'react';

import { Component, generateGuid, makeComponent, makeComponentWithChildren } from '@intenda/opus-ui';

export const ContainerDnd = makeComponentWithChildren('containerDnd');
export const ContainerMovable = makeComponentWithChildren('containerMovable');
export const Dragger = makeComponentWithChildren('dragger');
export const Mover = makeComponentWithChildren('mover');

export const LineDragger = makeComponent('lineDragger');
