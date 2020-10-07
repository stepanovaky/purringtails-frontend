import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmationPage from './ConfirmationPage';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<ConfirmationPage />)
})