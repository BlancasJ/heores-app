import { types } from "../../../auth/types/types";

describe('Tests in Types.js', () => {
  test('should return these types', () => {
    expect(types).toEqual({
      login:  '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});
