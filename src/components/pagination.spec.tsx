import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  // beforeEach(() => {})

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    expect(wrapper.getByText('Page 1 of 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total of 200 items')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const user = userEvent.setup()
    await user.click(
      wrapper.getByRole('button', {
        name: 'Next page',
      }),
    )

    expect(onPageChangeCallback).toHaveBeenCalledWith(2)
  })

  it('should be able to navigate to the previous page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={6}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const user = userEvent.setup()
    await user.click(
      wrapper.getByRole('button', {
        name: 'Previous page',
      }),
    )

    expect(onPageChangeCallback).toHaveBeenCalledWith(5)
  })

  it('should be able to navigate to the first page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={15}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const user = userEvent.setup()
    await user.click(
      wrapper.getByRole('button', {
        name: 'First page',
      }),
    )

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the last page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={15}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const user = userEvent.setup()
    await user.click(
      wrapper.getByRole('button', {
        name: 'Last page',
      }),
    )

    expect(onPageChangeCallback).toHaveBeenCalledWith(20)
  })

  it('should disable navigation buttons when on the first or last page', () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    expect(wrapper.getByRole('button', { name: 'First page' })).toBeDisabled()
    expect(
      wrapper.getByRole('button', { name: 'Previous page' }),
    ).toBeDisabled()

    expect(
      wrapper.getByRole('button', { name: 'Next page' }),
    ).not.toBeDisabled()

    expect(
      wrapper.getByRole('button', { name: 'Last page' }),
    ).not.toBeDisabled()
  })

  it('should disable navigation buttons when on the last page', () => {
    const wrapper = render(
      <Pagination
        pageIndex={20}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    expect(wrapper.getByRole('button', { name: 'Last page' })).toBeDisabled()
    expect(wrapper.getByRole('button', { name: 'Next page' })).toBeDisabled()

    expect(
      wrapper.getByRole('button', {
        name: 'Previous page',
      }),
    ).not.toBeDisabled()

    expect(
      wrapper.getByRole('button', { name: 'First page' }),
    ).not.toBeDisabled()
  })

  it('should disable navigation buttons when have 1 page', () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={10}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    expect(wrapper.getByRole('button', { name: 'Last page' })).toBeDisabled()
    expect(wrapper.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(
      wrapper.getByRole('button', {
        name: 'Previous page',
      }),
    ).toBeDisabled()
    expect(wrapper.getByRole('button', { name: 'First page' })).toBeDisabled()
  })

  it('should handle case when totalCount is 0', () => {
    const wrapper = render(
      <Pagination
        pageIndex={1}
        totalCount={0}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    expect(wrapper.getByText('Total of 0 items')).toBeInTheDocument()
    expect(wrapper.getByText('Page 1 of 1')).toBeInTheDocument()

    expect(
      wrapper.getByRole('button', {
        name: 'First page',
      }),
    ).toBeDisabled()
    expect(
      wrapper.getByRole('button', {
        name: 'Previous page',
      }),
    ).toBeDisabled()
    expect(
      wrapper.getByRole('button', {
        name: 'Next page',
      }),
    ).toBeDisabled()
    expect(
      wrapper.getByRole('button', {
        name: 'Last page',
      }),
    ).toBeDisabled()
  })
})
