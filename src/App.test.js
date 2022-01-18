import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { supabaseAnonKey, supabaseUrl } from './services/supabaseClient';


test.skip('renders learn react link', () => {
  render(
  <MemoryRouter>
  <App supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} />
  </MemoryRouter>
  );
  const linkElement = screen.getByText(/Supabase/i);
  expect(linkElement).toBeInTheDocument();
});
