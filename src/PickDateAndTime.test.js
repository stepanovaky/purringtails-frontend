import React from 'react';
import ReactDOM from 'react-dom';
import PickDateAndTime from './PickDateAndTime';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<PickDateAndTime />)
})