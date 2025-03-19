import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { NumberDisplay } from '@/components/NumberDisplay';

describe('Internationalization Integration Tests', () => {
  it('switches language and maintains context across components', () => {
    render(
      <LocaleProvider>
        <div>
          <LanguageSwitcher />
          <NumberDisplay label="Test Value" value={1234.5678} />
        </div>
      </LocaleProvider>
    );
    
    // Initially in English
    expect(screen.getByText('日本語')).toBeInTheDocument();
    expect(screen.getByText('1,234.568')).toBeInTheDocument();
    
    // Switch to Japanese
    const switchButton = screen.getByText('日本語').closest('button');
    if (switchButton) {
      fireEvent.click(switchButton);
      
      // Now in Japanese
      expect(screen.getByText('English')).toBeInTheDocument();
      // Number format should remain the same
      expect(screen.getByText('1,234.568')).toBeInTheDocument();
    }
  });
  
  it('formats numbers correctly with suffix', () => {
    render(
      <LocaleProvider>
        <div>
          <NumberDisplay label="Percentage" value={75} suffix="%" />
        </div>
      </LocaleProvider>
    );
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
}); 