import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Feedback_page from './Feedback_page';
import { loginContext } from './usercontext/Contextshare';
import { BrowserRouter } from 'react-router-dom';

// Mock feedbackapi
jest.mock('./service/Allapi', () => ({
  feedbackapi: jest.fn(() => Promise.resolve({ status: 200, data: 'Feedback submitted successfully' }))
}));

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <BrowserRouter>
      <loginContext.Provider {...providerProps}>{ui}</loginContext.Provider>
    </BrowserRouter>,
    renderOptions
  );
};

describe('Feedback_page Component', () => {
  const providerProps = {
    value: { loginData: { name: 'Test User' }, setloginData: jest.fn() }
  };

  beforeEach(() => {
    localStorage.setItem('active_user', JSON.stringify({ token: 'mock-token' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders all input fields and the submit button', () => {
    renderWithContext(<Feedback_page />, { providerProps });

    expect(screen.getByText('feedback section')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter comments/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('shows warning when submitting without selecting an option', async () => {
    renderWithContext(<Feedback_page />, { providerProps });

    fireEvent.change(screen.getByPlaceholderText(/enter comments/i), {
      target: { value: 'Test comment here' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Please select one of the options')).toBeInTheDocument();
    });
  });

  test('sets rating correctly when star is clicked', () => {
    renderWithContext(<Feedback_page />, { providerProps });

    const stars = screen.getAllByText('★');
    fireEvent.click(stars[2]); // Click the third star (rating = 3)
    expect(screen.getByText('Your Rating: 3')).toBeInTheDocument();
  });

  test('submits feedback successfully with valid input', async () => {
    renderWithContext(<Feedback_page />, { providerProps });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'bug' } });
    fireEvent.change(screen.getByPlaceholderText(/enter comments/i), {
      target: { value: 'There is a bug in the system' }
    });

    fireEvent.click(screen.getAllByText('★')[4]); // 5-star rating

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Feedback submitted successfully')).toBeInTheDocument();
    });
  });
});
