import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PrivateRoute } from "../../router/PrivateRoute";

describe('Tests in <PrivateRoute />', () => {
  test('should show children when user is authenticated', () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 'ABC123',
        name: 'TestName',
      },
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ ['/search?q=arrow'] }>
          <PrivateRoute>
            <h1>Public Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public Route')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=arrow');
  });
});
