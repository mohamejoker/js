import React from 'react';
import { render } from '@testing-library/react';
import SocialIcon from '../../components/SocialIcon';

describe('SocialIcon', () => {
  it('يعرض اسم المنصة بشكل صحيح', () => {
    const { getByText } = render(<SocialIcon platform="instagram" />);
    expect(getByText('إنستجرام')).toBeInTheDocument();
  });
});
