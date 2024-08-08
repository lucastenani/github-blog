import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getIssues } from '@/api/get-issues'
import { Pagination } from '@/components/pagination'

import { GitHubProfile } from './components/github-profile'
import { PublicationsList } from './components/publications-list'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? 1)
  const query = searchParams.get('query')

  const { data: result } = useQuery({
    queryKey: ['issues', pageIndex, query],
    queryFn: () => getIssues({ pageIndex, query }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams({ page: pageIndex.toString() })
  }

  return (
    <>
      <Helmet title="Home" />

      <div className="space-y-10">
        <GitHubProfile />
        <PublicationsList />

        <Pagination
          pageIndex={pageIndex}
          perPage={8}
          totalCount={result?.total_count || 0}
          onPageChange={handlePaginate}
        />
      </div>
    </>
  )
}
