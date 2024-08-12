import { http, HttpResponse } from 'msw'

import { GetIssuesResponse } from '../get-issues'

export type SimpleIssue = {
  id: number
  title: string
  body: string
  created_at: string
  url: string
  number: number
}

const issues: SimpleIssue[] = Array.from({ length: 60 }).map((_, i) => {
  return {
    id: i + 1,
    number: i + 1,
    title: `Test Issue ${i + 1}`,
    body: `Test Issue ${i + 1} description`,
    created_at: new Date().toISOString(),
    url: `https://github.com/frontendbr/vagas/issues/${i + 1}`,
  }
})
export const publicationsListMock = http.get<never, never, GetIssuesResponse>(
  '/search/issues',
  async ({ request }) => {
    console.log(issues[1])
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const pageIndex = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 1

    const encodedQuery = query
      ? query.split(' state:open repo:frontendbr/vagas')[0]
      : ''

    let filteredIssues = issues

    if (encodedQuery) {
      filteredIssues = filteredIssues.filter(
        (issue) =>
          issue.body?.includes(encodedQuery) ||
          issue.title?.includes(encodedQuery),
      )
    }

    const paginatedIssues = filteredIssues.slice(
      (pageIndex - 1) * 10,
      pageIndex * 10,
    )

    return HttpResponse.json({
      items: paginatedIssues,
      total_count: filteredIssues.length,
      incomplete_results: true,
    })
  },
)

// ?q=${encodedQuery}+state:open+repo:frontendbr/vagas&sort=created&order=desc&per_page=10&page=${pageIndex}
// items: [
//   {
//     id: 1,
//     title: 'Issue de teste 1',
//     body: 'Descrição da issue de teste 1',
//     created_at: '2024-08-12T12:34:56Z',
//     url: 'https://github.com/frontendbr/vagas/issues/1',
//   },
//   {
//     id: 2,
//     title: 'Issue de teste 2',
//     body: 'Descrição da issue de teste 2',
//     created_at: '2024-08-11T11:33:55Z',
//     url: 'https://github.com/frontendbr/vagas/issues/2',
//   },
// ],
