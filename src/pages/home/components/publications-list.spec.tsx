import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { PublicationsList } from './publications-list'

describe('PublicationsList', () => {
  const queryClient = new QueryClient()
  const mockIssues = {
    total_count: 10,
    items: [
      {
        id: '1',
        number: 1,
        title: 'Issue Title',
        created_at: new Date(),
        body: 'Issue Body',
      },
    ],
  }

  it('should render loading state', () => {
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PublicationsList />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    expect(wrapper.getByPlaceholderText('Search content')).toBeDisabled()
    expect(wrapper.getByRole('button', { name: 'Search' })).toBeDisabled()
    expect(wrapper.getByRole('button', { name: 'Clear filter' })).toBeDisabled()
  })

  it('should render fetched data', async () => {
    // const wrapper = render(
    //   <QueryClientProvider client={queryClient}>
    //     <MemoryRouter>
    //       <PublicationsList />
    //     </MemoryRouter>
    //   </QueryClientProvider>,
    // )
    // expect(wrapper.getByPlaceholderText('Search content')).not.toBeDisabled()
    // expect(wrapper.getByRole('button', { name: 'Search' })).not.toBeDisabled()
    // expect(
    //   wrapper.getByRole('button', { name: 'Clear filter' }),
    // ).not.toBeDisabled()
  })

  it('should call handleFilter on form submit', async () => {})

  it('should call handleClearFilter on button click', async () => {
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/?page=3&query=a']}>
          <PublicationsList />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    const user = userEvent.setup()
    await user.click(
      wrapper.getByRole('button', {
        name: 'Clear filter',
      }),
    )

    // expect(window.location.pathname).toBe('/')
  })

  it('should handle input validation errors', async () => {})
})
