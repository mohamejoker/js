import React from 'react';
import { render } from '@testing-library/react';
import PlatformModal from '../../components/PlatformModal';

describe('PlatformModal', () => {
  it('لا يعرض شيئًا إذا لم يتم تمرير منصة', () => {
    const { container } = render(<PlatformModal isOpen={true} />);
    expect(container).toBeEmptyDOMElement();
  });
});
