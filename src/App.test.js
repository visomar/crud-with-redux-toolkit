import React from 'react';
import { render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import App from './App';

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

describe("App component test suite", () => {

  test('when no token, renders login form page', () => {
    // given
    useSelector.mockImplementationOnce(() => false);

    // when
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // then
    expect(getByText(/welcome to this test application/i)).toBeInTheDocument();
  });

  test('when token, renders content page', () => {
    //given
    useSelector.mockImplementationOnce(() => true);

    // when
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // then
    expect(getByText(/select one of the tabs above/i)).toBeInTheDocument();
  });
});

