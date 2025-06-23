import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SocialPlatformIcons from '../../components/SocialPlatformIcons';

describe('SocialPlatformIcons', () => {
  it('يظهر جميع أيقونات المنصات', () => {
    render(<SocialPlatformIcons />);
    expect(screen.getByText('تيك توك')).toBeInTheDocument();
    expect(screen.getByText('سناب شات')).toBeInTheDocument();
    expect(screen.getByText('إنستجرام')).toBeInTheDocument();
    expect(screen.getByText('يوتيوب')).toBeInTheDocument();
  });

  it('يفتح نافذة التفاصيل عند الضغط على أيقونة', () => {
    render(<SocialPlatformIcons />);
    fireEvent.click(screen.getByText('تيك توك'));
    expect(screen.getByText('الخدمات المتاحة:')).toBeInTheDocument();
  });

  it('يغلق نافذة التفاصيل عند الضغط على إغلاق', () => {
    render(<SocialPlatformIcons />);
    fireEvent.click(screen.getByText('تيك توك'));
    fireEvent.click(screen.getByText('إغلاق'));
    expect(screen.queryByText('الخدمات المتاحة:')).not.toBeInTheDocument();
  });
});
