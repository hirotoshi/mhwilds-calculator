import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { LocaleProvider } from '@/contexts/LocaleContext';

describe('LanguageSwitcher', () => {
  it('displays the correct language option based on current locale', () => {
    render(
      <LocaleProvider>
        <LanguageSwitcher />
      </LocaleProvider>
    );
    
    // Default locale is 'en', so it should show '日本語'
    expect(screen.getByText('日本語')).toBeInTheDocument();
  });

  it('toggles the language when clicked', () => {
    render(
      <LocaleProvider>
        <LanguageSwitcher />
      </LocaleProvider>
    );
    
    // Default locale is 'en', showing '日本語'
    const button = screen.getByText('日本語').closest('button');
    expect(button).toBeInTheDocument();
    
    if (button) {
      fireEvent.click(button);
      // After clicking, locale should be 'ja', showing 'English'
      expect(screen.getByText('English')).toBeInTheDocument();
      
      // Click again to toggle back
      fireEvent.click(button);
      expect(screen.getByText('日本語')).toBeInTheDocument();
    }
  });
}); 