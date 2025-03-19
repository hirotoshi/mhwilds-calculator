import { render, screen } from '@testing-library/react';
import { NumberDisplay } from '../NumberDisplay';
import { LocaleProvider } from '@/contexts/LocaleContext';

describe('NumberDisplay', () => {
  const renderWithLocale = (locale: 'en' | 'ja') => {
    return render(
      <LocaleProvider>
        <NumberDisplay label="Test Label" value={1234.5678} />
      </LocaleProvider>
    );
  };

  it('displays the label correctly', () => {
    renderWithLocale('en');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('formats numbers correctly in English locale', () => {
    renderWithLocale('en');
    expect(screen.getByText('1,234.568')).toBeInTheDocument();
  });

  it('formats numbers correctly in Japanese locale', () => {
    renderWithLocale('ja');
    expect(screen.getByText('1,234.568')).toBeInTheDocument();
  });

  it('displays suffix when provided', () => {
    render(
      <LocaleProvider>
        <NumberDisplay label="Test Label" value={50} suffix="%" />
      </LocaleProvider>
    );
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
}); 