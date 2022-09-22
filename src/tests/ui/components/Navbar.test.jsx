import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from '../../../ui/components/Navbar'
import { AuthContext } from '../../../auth/context/AuthContext';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Tests in <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'John',
    },
    logout: jest.fn(),
  };

  beforeEach(jest.clearAllMocks);

  test('should show logged user name', () => {
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('John')).toBeTruthy();
  });

  test('should call logout and navigate functions when cliking on logout button', () => {
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockUsedNavigate).toHaveBeenCalled();
    expect(mockUsedNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
