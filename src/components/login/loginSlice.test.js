import loginReducer, {attemptLogin, selectUser, selectToken} from './loginSlice';
import store from '../../app/store';
import axios from 'axios';

jest.mock('axios');

describe("loginSlice reducer, actions and selectors test suite", () => {
  test('should handle initial state', () => {
    // then
    expect(loginReducer(undefined, {})).toEqual({
      name: null,
      token: null
    });
  });

  test('selectors should retrieve proper value', () => {
    // when
    const state = {
      login: {
        name: 'yepe',
        token: 'token'
      }
    };

    // then
    expect(selectUser(state)).toBe('yepe');
    expect(selectToken(state)).toBe('token');
  });

  test('actions change the state accordingly', async () => {
    // given
    const response = {
      data: {
        id: 'user1337',
        token: '1234'
      }
    };
    axios.get.mockResolvedValue(response);

    // when
    await store.dispatch(attemptLogin({name: 'user1', pass: 'pass'}));
    const state = store.getState();

    //then
    expect(selectUser(state)).toBe('user1337');
    expect(selectToken(state)).toBe('1234');
  });

});
