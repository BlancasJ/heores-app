import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from '../../../heroes/pages/SearchPage'

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Tests in <SearchPage />', () => {
  beforeEach(jest.clearAllMocks);

  test('should show component with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('should show Arrow results and input has value in queryString', () => {
    render(
      <MemoryRouter initialEntries={ ['/search?q=arrow'] }>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('arrow');

    const image = screen.getByRole('img');
    expect(image.src).toContain('/assets/heroes/dc-arrow.jpg');

    const alert = screen.getByText('No hero with');
    expect(alert.style.display).toBe('none');
  });

  test('should show an error when not hero found', () => {
    render(
      <MemoryRouter initialEntries={ ['/search?q=nohero'] }>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByText('No hero with');
    expect(alert.style.display).toBeFalsy();
  });

  test('should call navigate', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'spider', name: 'searchText' } });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith('?q=spider');
  });
});
