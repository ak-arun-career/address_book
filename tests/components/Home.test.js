import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/App';
import { Home } from 'Components/Home';

describe('App', () => {
    it("renders without error", () => {
        const page1 = shallow(<App />);
        expect(page1.length).toEqual(1);
    });

    it("should render the child component correctly", () => {
        const child = "Contact";
        const page2 = shallow(<App>{child}</App>);
        expect(page2).toMatchSnapshot();
    });

    it('should render a <Home /> component', () => {
        const page3 = shallow(<App />);
        expect(page3.find(Home)).toHaveLength(1);
    })
})