import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getIssues, useUrlSearchParams } from '@/api/get-issues'
import { Pagination } from '@/components/pagination'

import { GitHubProfile } from './components/github-profile'
import { PublicationsList } from './components/publications-list'

export function Home() {
  const { pageIndex, query, setSearchParams } = useUrlSearchParams()

  const { data: result } = useQuery({
    queryKey: ['issues', pageIndex, query],
    queryFn: () => getIssues({ pageIndex, query }),
  })

  function handlePaginate(pageIndex: number) {
    window.scrollTo(0, 0)

    setSearchParams((state) => {
      if (query) {
        state.set('query', query)
      } else {
        state.delete('query')
      }

      state.set('page', pageIndex.toString())
      return state
    })
  }

  return (
    <>
      <Helmet title="Home" />

      <div className="space-y-10">
        <GitHubProfile />
        <PublicationsList />

        <Pagination
          pageIndex={pageIndex}
          perPage={10}
          totalCount={result?.total_count || 0}
          onPageChange={handlePaginate}
        />
      </div>
    </>
  )
}
