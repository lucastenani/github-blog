import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

interface Reactions {
  url: string
  total_count: number
  '+1': number
  '-1': number
  laugh: number
  hooray: number
  confused: number
  heart: number
  rocket: number
  eyes: number
}

interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  labels: string[]
  state: string
  locked: boolean
  assignee: null
  assignees: string[]
  milestone: null
  comments: number
  created_at: string
  updated_at: string
  closed_at: null
  author_association: string
  active_lock_reason: null
  body: string
  reactions: Reactions
  timeline_url: string
  performed_via_github_app: null
  state_reason: null
  score: number
}

interface GitHubIssuesResponse {
  total_count: number
  incomplete_results: boolean
  items: Issue[]
}

interface GetIssuesParams {
  pageIndex?: number
  query?: string
}

export async function getIssues({ pageIndex = 1, query }: GetIssuesParams) {
  const encodedQuery = query ? encodeURIComponent(query) : '%20'
  const url = `/search/issues?q=${encodedQuery}+state:open+repo:frontendbr/vagas&sort=created&order=desc&per_page=10&page=${pageIndex}`

  try {
    const response = await api.get<GitHubIssuesResponse>(url)
    const { items } = response.data

    if (items.length === 0) {
      toast.error('No results found')
    } else {
      toast.success('Search successful')
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.status === 422
          ? 'No results found'
          : 'An error occurred. Please try again.'
      toast.error(errorMessage)
    } else {
      toast.error('An unexpected error occurred.')
    }
  }
}

export function useUrlSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) || 1
  const query = searchParams.get('query') ?? ''

  return { pageIndex, query, setSearchParams }
}
