import {
  GithubLogo,
  Link as LinkIcon,
  MapPin,
  Users,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { getIssues } from '@/api/get-issues'
import { getUser } from '@/api/get-user'
import { Pagination } from '@/components/pagination'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function Home() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  })

  const { data: issues } = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
  })

  function concatString(text: string, textType: 'title' | 'body'): string {
    if (textType === 'title') {
      return text.length > 30 ? text.substring(0, 30).concat('...') : text
    }

    return text.length > 160 ? text.substring(0, 160).concat('...') : text
  }

  return (
    <>
      <Helmet title="Home" />

      <div className="space-y-10">
        <section>
          <Card className="flex flex-col md:flex-row md:items-center md:p-4">
            <img
              className="w-full rounded-t-lg md:h-48 md:max-w-48 md:rounded-lg"
              src={profile?.avatar_url}
              alt={`${profile?.login} profile avatar`}
            />
            <div className="md:flex-1">
              <CardHeader className="md:flex-row md:flex-wrap md:items-center md:justify-between">
                <CardTitle>{profile?.name}</CardTitle>
                <CardDescription>
                  <a
                    className="flex cursor-pointer items-center gap-1 font-semibold uppercase text-primary hover:underline hover:opacity-75"
                    href={`https://github.com/${profile?.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                    <LinkIcon size={20} />
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{profile?.bio}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start md:flex-row md:flex-wrap md:gap-4">
                <div className="flex items-center gap-2">
                  <GithubLogo size={20} className="text-muted-foreground" />
                  {profile?.login}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-muted-foreground" />
                  {profile?.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-muted-foreground" />
                  {profile?.followers} followers
                </div>
              </CardFooter>
            </div>
          </Card>
        </section>

        <section>
          <div className="mb-4 md:flex md:items-center md:justify-between">
            <h2 className="text-2xl">Publications</h2>
            <span className="text-sm text-muted-foreground">
              {issues?.total_count} publications
            </span>
          </div>

          <Input
            placeholder="Search content"
            className="focus:border-primary"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {issues?.items.map((issue) => {
            return (
              <Link key={issue.id} to={`/post/${issue.number}`}>
                <Card className="hover:opacity-85 md:h-[265px]">
                  <CardHeader className="md:flex md:flex-row md:flex-wrap md:justify-between md:gap-2">
                    <CardTitle className="text-xl md:max-w-xs">
                      {concatString(issue.title, 'title')}
                    </CardTitle>
                    <CardDescription>{issue.created_at}</CardDescription>
                  </CardHeader>
                  <CardContent className="break-words text-muted-foreground">
                    {concatString(issue.body, 'body')}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </section>
        <Pagination pageIndex={0} perPage={10} totalCount={105} />
      </div>
    </>
  )
}
