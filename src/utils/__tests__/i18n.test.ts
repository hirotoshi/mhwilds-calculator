import { formatNumber, getLocalizedString, createLocalizedString } from '../i18n';

describe('i18n utilities', () => {
  describe('formatNumber', () => {
    it('formats numbers correctly in English locale', () => {
      expect(formatNumber(1234.5678, 'en')).toBe('1,234.568');
      expect(formatNumber(0.123, 'en')).toBe('0.123');
      expect(formatNumber(1000000, 'en')).toBe('1,000,000');
    });

    it('formats numbers correctly in Japanese locale', () => {
      expect(formatNumber(1234.5678, 'ja')).toBe('1,234.568');
      expect(formatNumber(0.123, 'ja')).toBe('0.123');
      expect(formatNumber(1000000, 'ja')).toBe('1,000,000');
    });
  });

  describe('getLocalizedString', () => {
    it('returns the correct language string based on locale', () => {
      const localizedString = {
        en: 'Hello',
        ja: 'こんにちは'
      };
      
      expect(getLocalizedString(localizedString, 'en')).toBe('Hello');
      expect(getLocalizedString(localizedString, 'ja')).toBe('こんにちは');
    });

    it('falls back to English when the requested locale is not available', () => {
      const localizedString = {
        en: 'Hello'
      };
      
      expect(getLocalizedString(localizedString, 'ja')).toBe('Hello');
    });
  });

  describe('createLocalizedString', () => {
    it('creates a properly formatted LocalizedString object', () => {
      const result = createLocalizedString('Hello', 'こんにちは');
      
      expect(result).toEqual({
        en: 'Hello',
        ja: 'こんにちは'
      });
    });
  });
}); 