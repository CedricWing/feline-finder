import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { CatBreedSortAttribute } from '../../lib/types';
import RadioDropDown from './index';

const SORT = [
  { label: 'Name', value: CatBreedSortAttribute.name },
  { label: 'Lifespan', value: CatBreedSortAttribute.lifespan },
  { label: 'Weight', value: CatBreedSortAttribute.weight },
];

let container: Element;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

describe('Test RadioDropdown', () => {
  it('Renders without crashing', () => {
    let sortBy: string | undefined;
    const updateSortBy = (key: string | undefined) => {
      sortBy = key;
    };
    act(() => {
      render(
        <RadioDropDown
          options={SORT}
          value={sortBy}
          onChange={(key) => updateSortBy(key)}
        >
          Sort
        </RadioDropDown>,
        container,
      );
    });
    // Should render 4 options for dropdown menu
    expect(container.querySelector('#dropdown-menu')?.children.length).toEqual(
      4,
    );
    const options = container.querySelectorAll('.form-check-label');
    expect(options[0].textContent).toEqual('Name');
    expect(options[options.length - 1].textContent).toEqual('Weight');
  });
  it('Update sortby on click', () => {
    let sortBy: string | undefined;
    const updateSortBy = (key: string | undefined) => {
      sortBy = key;
    };
    act(() => {
      render(
        <RadioDropDown
          options={SORT}
          value={sortBy}
          onChange={(key) => updateSortBy(key)}
        >
          Sort
        </RadioDropDown>,
        container,
      );
    });
    const option = container.querySelector('.dropdown-item');

    act(() => {
      const event = option?.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    });
    expect(sortBy).toEqual('name');
  });
});
