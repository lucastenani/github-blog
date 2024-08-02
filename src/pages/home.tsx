import {
  Building,
  GithubLogo,
  Link as LinkIcon,
  Users,
} from '@phosphor-icons/react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

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
  function concatString(text: string) {
    return text.length > 180 ? text.substring(0, 181).concat('...') : text
  }
  return (
    <>
      <Helmet title="Home" />

      <div className="space-y-10">
        <section>
          <Card className="flex flex-col md:flex-row md:items-center md:p-4">
            <img
              className="w-full rounded-t-lg md:h-48 md:max-w-48 md:rounded-lg"
              src="https://avatars.githubusercontent.com/u/75996842?v=4"
              alt="lucastenani profile avatar"
            />
            <div className="md:flex-1">
              <CardHeader className="md:flex-row md:flex-wrap md:items-center md:justify-between">
                <CardTitle>Lucas Tenani</CardTitle>
                <CardDescription>
                  <a
                    className="flex cursor-pointer items-center gap-1 font-semibold uppercase text-primary hover:underline hover:opacity-75"
                    href="https://github.com/lucastenani"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                    <LinkIcon size={20} />
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hello! I'm Lucas Tenani, a passionate front-end developer
                  focused on React.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start md:flex-row md:flex-wrap md:gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GithubLogo size={20} />
                  <p>lucastenani</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building size={20} />
                  <p>Brazil</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={20} />
                  <p> 9 followers</p>
                </div>
              </CardFooter>
            </div>
          </Card>
        </section>

        <section>
          <div className="mb-4 md:flex md:items-center md:justify-between">
            <h2 className="text-2xl">Publications</h2>
            <span className="text-sm text-muted-foreground">
              6 publications
            </span>
          </div>

          <Input
            placeholder="Search content"
            className="focus:border-primary"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => {
            return (
              <Link key={i} to={'/post/1'}>
                <Card>
                  <CardHeader className="md:flex md:flex-row md:flex-wrap md:justify-between md:gap-2">
                    <CardTitle className="text-xl md:max-w-xs">
                      JavaScript data types and data structures
                    </CardTitle>
                    <CardDescription>1 day ago</CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {concatString(
                      'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in',
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </section>
      </div>
    </>
  )
}
