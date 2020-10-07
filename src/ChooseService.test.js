import React from 'react';
import ReactDOM from 'react-dom';
import ChooseService from './ChooseService';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<ChooseService />)
})