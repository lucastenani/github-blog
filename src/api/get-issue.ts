import { api } from '@/lib/axios'

type User = {
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

type Reaction = {
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

type Issue = {
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
  assignee: User | null
  assignees: User[]
  milestone: string | null
  comments: number
  created_at: string | Date
  updated_at: string
  closed_at: string | null
  author_association: string
  active_lock_reason: string | null
  body: string
  closed_by: User | null
  reactions: Reaction
  timeline_url: string
  performed_via__app: string | null
  state_reason: string | null
}

export async function getIssue() {
  const response = await api.get<Issue>('/repos/frontendbr/vagas/issues/1')

  return response.data
}
