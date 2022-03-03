import React from 'react';

import { render, screen } from '@testing-library/react';
import HomePage from '@pages/index';

/**
 * @jest-environment node
 */

describe('HomePage', () => {
  it('should render the heading', () => {
    render(<HomePage />);

    const heading = screen.getByText(/Spotify Playlist/i);

    expect(heading).toBeInTheDocument();
  });
});
