import {
  CalendarDots,
  CaretLeft,
  ChatCircle,
  GithubLogo,
  Link as LinkIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
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

export function Post() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  })

  const { data: issue } = useQuery({
    queryKey: ['issue'],
    queryFn: getIssue,
  })

  return (
    <>
      <Helmet title="Post" />

      <div className="space-y-10">
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-1">
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
            <CardFooter className="flex flex-col items-start md:flex-row md:flex-wrap md:gap-4">
              <div className="flex items-center gap-2">
                <GithubLogo size={20} className="text-muted-foreground" />
                {profile?.login}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDots size={20} className="text-muted-foreground" />1
                day ago
              </div>
              <div className="flex items-center gap-2">
                <ChatCircle size={20} className="text-muted-foreground" />
                {issue?.comments} comments
              </div>
            </CardFooter>
          </Card>
        </section>

        <section className="space-y-3">
          <Markdown remarkPlugins={[remarkGfm]}>{issue?.body}</Markdown>
        </section>
      </div>
    </>
  )
}
