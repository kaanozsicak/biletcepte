import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders BiletCepte app header', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // App componentinin render edildiğini doğrula
  const appElement = screen.getByRole('banner', { hidden: true });
  expect(appElement).toBeInTheDocument();
});
