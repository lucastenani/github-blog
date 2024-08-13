import {
  CalendarDots,
  CaretLeft,
  ChatCircle,
  GithubLogo,
  Link as LinkIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Helmet } from 'react-helmet-async'
import Markdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'

import { getIssue } from '@/api/get-issue'
import { getUser } from '@/api/get-user'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { PositionSkeleton } from './skeleton'

export function Position() {
  const { id: issueId } = useParams()
  const { data: profile, isFetched: isFetchedProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  })

  const {
    data: issue,
    isFetched: isFetchedIssue,
    isError,
  } = useQuery({
    queryKey: ['issue', issueId],
    queryFn: () => getIssue({ issueId }),
  })

  if (isError) {
    return (
      <>
        <Helmet title="Position Not Found :(" />

        <section className="flex h-screen flex-col items-center justify-center gap-2 md:h-full md:pt-12 lg:pt-36">
          <h1 className="text-4xl font-bold">Position Not Found</h1>
          <p className="text-accent-foreground">
            Back to{' '}
            <Link className="text-primary hover:underline" to={'/'}>
              home
            </Link>
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <Helmet title="Position" />

      {isFetchedIssue && isFetchedProfile ? (
        <div className="space-y-10">
          <section>
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <Link
                    to={'/'}
                    className="flex cursor-pointer items-center gap-1 font-semibold uppercase text-primary hover:underline hover:opacity-75"
                  >
                    <CaretLeft size={18} />
                    return
                  </Link>
                  <a
                    className="flex cursor-pointer items-center gap-1 font-semibold uppercase text-primary hover:underline hover:opacity-75"
                    href={issue?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    see on github
                    <LinkIcon size={18} />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-3xl">{issue?.title}</CardTitle>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:gap-4">
                <div className="flex items-center gap-2">
                  <GithubLogo size={20} className="text-muted-foreground" />
                  {profile?.login}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDots size={20} className="text-muted-foreground" />
                  {issue?.created_at &&
                    formatDistanceToNow(issue.created_at, {
                      locale: enUS,
                      addSuffix: true,
                    })}
                </div>
                <div className="flex items-center gap-2">
                  <ChatCircle size={20} className="text-muted-foreground" />
                  {issue?.comments} comments
                </div>
              </CardFooter>
            </Card>
          </section>

          <section className="space-y-3">
            <Markdown remarkPlugins={[remarkGfm]} className="break-words">
              {issue?.body}
            </Markdown>
          </section>
        </div>
      ) : (
        <PositionSkeleton />
      )}
    </>
  )
}
