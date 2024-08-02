import {
  CalendarDots,
  CaretLeft,
  ChatCircle,
  GithubLogo,
  Link as LinkIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

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
                  href="https://github.com/lucastenani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  see on github
                  <LinkIcon size={18} />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl">
                JavaScript data types and data structures
              </CardTitle>
            </CardContent>
            <CardFooter className="flex flex-col items-start md:flex-row md:flex-wrap md:gap-4">
              <div className="flex items-center gap-2">
                <GithubLogo size={20} className="text-muted-foreground" />
                {profile?.login}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDots size={20} className="text-muted-foreground" />
                <p>1 day ago</p>
              </div>
              <div className="flex items-center gap-2">
                <ChatCircle size={20} className="text-muted-foreground" />
                <p> 5 comments</p>
              </div>
            </CardFooter>
          </Card>
        </section>

        <section className="space-y-3">
          <p className="text-lg text-muted-foreground">
            Programming languages all have built-in data structures, but these
            often differ from one language to another. This article attempts to
            list the built-in data structures available in JavaScript and what
            properties they have. These can be used to build other data
            structures. Wherever possible, comparisons with other languages are
            drawn.
          </p>
          <p className="text-lg text-primary underline">Dynamic typing</p>
          <p className="text-lg text-muted-foreground">
            JavaScript is a loosely typed and dynamic language. Variables in
            JavaScript are not directly associated with any particular value
            type, and any variable can be assigned (and re-assigned) values of
            all types:
          </p>
        </section>
      </div>
    </>
  )
}
