import { http, HttpResponse } from 'msw'

export const publicationsListMock = http.get(
  `/search/issues?q=%20+state:open+repo:frontendbr/vagas&sort=created&order=desc&per_page=10&page=1`,
  () => {
    return new HttpResponse(null, { status: 401 })
  },
)
