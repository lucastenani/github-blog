import { zodResolver } from '@hookform/resolvers/zod'
import {
  GithubLogo,
  Link as LinkIcon,
  MapPin,
  Users,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getIssues } from '@/api/get-issues'
import { getUser } from '@/api/get-user'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { HomeSkeleton } from './skeleton'

const issuesFilterSchema = z.object({
  query: z.string().optional(),
})

type IssuesFilterSchema = z.infer<typeof issuesFilterSchema>

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? 1)
  const query = searchParams.get('query')

  const { register, handleSubmit } = useForm<IssuesFilterSchema>({
    resolver: zodResolver(issuesFilterSchema),
    defaultValues: { query: query || '' },
  })

  const { data: profile, isFetched: isFetchedProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  })

  const { data: result, isFetched: isFetchedIssues } = useQuery({
    queryKey: ['issues', pageIndex, query],
    queryFn: () => getIssues({ pageIndex, query }),
  })

  function concatString(text: string, textType: 'title' | 'body'): string {
    if (textType === 'title') {
      return text.length > 40 ? text.substring(0, 40).concat('...') : text
    }

    return text.length > 160 ? text.substring(0, 160).concat('...') : text
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  function handleFilter({ query }: IssuesFilterSchema) {
    setSearchParams((state) => {
      if (query) {
        state.set('query', query)
      } else {
        state.delete('query')
      }

      state.set('page', '1')

      return state
    })
  }

  return (
    <>
      <Helmet title="Home" />

      {isFetchedIssues && isFetchedProfile ? (
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
                {result?.total_count} publications
              </span>
            </div>

            <form
              onSubmit={handleSubmit(handleFilter)}
              className="flex flex-col items-center gap-2 md:flex-row"
            >
              <Input
                placeholder="Search content"
                className="focus:border-primary"
                {...register('query')}
              />
              <Button
                type="submit"
                variant={'outline'}
                className="h-11 w-full rounded-md px-8 hover:border-primary md:max-w-32"
              >
                Search
              </Button>
            </form>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {result &&
              result.items.map((issue) => {
                return (
                  <Link key={issue.id} to={`/post/${issue.number}`}>
                    <Card className="hover:opacity-85 md:h-80">
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-xl md:max-w-xs">
                          {concatString(issue.title, 'title')}
                        </CardTitle>
                        <CardDescription>
                          {formatDistanceToNow(issue.created_at, {
                            locale: enUS,
                            addSuffix: true,
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="break-words text-muted-foreground">
                        {concatString(issue.body, 'body')}
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
          </section>

          {result && (
            <Pagination
              pageIndex={pageIndex}
              perPage={8}
              totalCount={result.total_count}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      ) : (
        <HomeSkeleton />
      )}
    </>
  )
}
