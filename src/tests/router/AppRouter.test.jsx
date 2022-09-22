import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import { AppRouter } from "../../router/AppRouter";

describe('Tests in <AppRouter />', () => {
  test('should show login when user is not authenticated', () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={ ['/marvel'] }>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('should show marvel page when user is authenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC123',
        name: 'TestName',
      },
    };

    render(
      <MemoryRouter initialEntries={ ['/login'] }>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Marvel').length).toBe(1);
    expect(screen.getAllByText('DC').length).toBe(1);
  });
});
