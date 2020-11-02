import React from 'react';
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import store from "../../app/store";
import Login from './Login';

describe("Login component test suite", () => {
  test('regular rendering of the component', () => {
    // given

    // when
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // then
    expect(getByText(/Username/i)).toBeInTheDocument();
    expect(getByText(/Password/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Insert here your name/i)).toBeInTheDocument();
  });
});
