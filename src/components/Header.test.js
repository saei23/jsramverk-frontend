import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Header from './Header'; // Importera Header-komponenten

test('renders Header component with correct text', () => {
  // Rendera Header-komponenten
  render(<Header />);


  const headingElement = screen.getByText(/SSR Editor/i);
  expect(headingElement).toBeInTheDocument();


  const paragraphElement = screen.getByText(/Hantera dina dokument med den senaste dokumentbehandlaren/i);
  expect(paragraphElement).toBeInTheDocument();
});