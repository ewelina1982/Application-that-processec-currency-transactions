import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '../_mock_/matchMedia.mock.js';
import App from '../../App';

describe('Test method search', () =>{
  it('check exist search input', ()=> {
    const {getByTestId} = render(<App/>);

    expect(getByTestId('search-input')).toBeInTheDocument();
  });

  it('check exist placeholder', ()=> {
    const {getByPlaceholderText} = render(<App/>);

    expect(getByPlaceholderText('Wpisz liczbę')).toBeInTheDocument();
  });

  it('check for entry into input', ()=> {
    const {getByTestId} = render(<App/>);
    fireEvent.change(getByTestId('search-input'), {
      target: {value: '4'}
    });

    expect(getByTestId('search-input')).toHaveValue('4');
  });

  it('check exist add button', ()=> {
    const {getByTestId} = render(<App/>);

    expect(getByTestId('add-button')).toBeInTheDocument();
  });

  it('check exist name button', ()=> {
    const {getByText} = render(<App/>);

    expect(getByText(/Dodawanie transakcji/i)).toBeInTheDocument();
  });
})
