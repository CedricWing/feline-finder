import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import ImageLoader from './index';

jest.mock('axios');
describe('Test ImageLoader', () => {
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
  it('Renders without crashing', () => {
    act(() => {
      renderHook(() => <ImageLoader url={'www.test.com'} id={'alt'} />);
    });
  });
});
