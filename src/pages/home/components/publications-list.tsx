import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getIssues } from '@/api/get-issues'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

const issuesFilterSchema = z.object({
  query: z.string().optional(),
})

type IssuesFilterSchema = z.infer<typeof issuesFilterSchema>

export function PublicationsList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? 1)
  const query = searchParams.get('query')

  const { data: result, isFetched: isFetchedIssues } = useQuery({
    queryKey: ['issues', pageIndex, query],
    queryFn: () => getIssues({ pageIndex, query }),
  })

  const { register, handleSubmit } = useForm<IssuesFilterSchema>({
    resolver: zodResolver(issuesFilterSchema),
    defaultValues: { query: query || '' },
  })

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

  return isFetchedIssues ? (
    <>
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
    </>
  ) : (
    <>
      <section>
        <div className="mb-4 md:flex md:items-center md:justify-between">
          <h2 className="text-2xl">Publications</h2>
          <Skeleton className="h-[20px] w-2/3 rounded-full md:w-[150px]" />
        </div>

        <form className="flex flex-col items-center gap-2 md:flex-row">
          <Input
            placeholder="Search content"
            className="focus:border-primary"
            disabled
          />
          <Button
            type="submit"
            variant={'outline'}
            className="h-11 w-full rounded-md px-8 hover:border-primary md:max-w-32"
            disabled
          >
            Search
          </Button>
        </form>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <Skeleton
              key={i}
              className="h-[324px] w-full rounded-md md:h-[265px]"
            />
          )
        })}
      </section>
    </>
  )
}

function concatString(text: string, textType: 'title' | 'body'): string {
  if (textType === 'title') {
    return text.length > 40 ? text.substring(0, 40).concat('...') : text
  }

  return text.length > 160 ? text.substring(0, 160).concat('...') : text
}
