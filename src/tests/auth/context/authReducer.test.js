import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth/types/types";

describe('Tests in authReducer', () => {
  test('should return default state', () => {
    const initState = { logged: false };
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should authenticate and write the user name', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'John',
      },
    };

    const state = authReducer({ logged: true }, action);
    expect(state).toEqual({
      logged: true,
      user: {
        name: 'John',
      },
    });
  });

  test('should remove username and set logged to false', () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer({ logged: true, name: 'John' }, action);
    expect(state).toEqual({
      logged: false,
    });
  });
});
