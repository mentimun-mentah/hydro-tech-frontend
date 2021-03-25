import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Sidebar from 'components/Layout/Sidebar';

render(<Sidebar />);

test('Collapse clicked', () => {
  fireEvent.click(screen.getByTestId('sidebar-collapsed-icon'))
})
