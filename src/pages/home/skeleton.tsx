import {
  GithubLogo,
  Link as LinkIcon,
  MapPin,
  Users,
} from '@phosphor-icons/react'

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
import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
  return (
    <div className="space-y-10">
      <section>
        <Card className="flex flex-col md:flex-row md:items-center md:p-4">
          <Skeleton className="h-64 w-full rounded-t-lg md:h-48 md:max-w-48 md:rounded-lg" />
          <div className="md:flex-1">
            <CardHeader className="md:flex-row md:flex-wrap md:items-center md:justify-between">
              <CardTitle>
                <Skeleton className="h-[20px] w-full flex-1 rounded-full md:w-[200px]" />
              </CardTitle>
              <CardDescription>
                <p className="flex cursor-not-allowed items-center gap-1 font-semibold uppercase text-primary">
                  github
                  <LinkIcon size={20} />
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <Skeleton className="h-[20px] w-full rounded-full" />
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start md:flex-row md:flex-wrap md:gap-4">
              <div className="flex items-center gap-2">
                <GithubLogo size={20} className="text-muted-foreground" />
                <Skeleton className="h-[20px] w-[60px] rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-muted-foreground" />
                <Skeleton className="h-[20px] w-[60px] rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-muted-foreground" />
                <Skeleton className="h-[20px] w-[60px] rounded-full" />
              </div>
            </CardFooter>
          </div>
        </Card>
      </section>

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
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <Skeleton
              key={i}
              className="h-[324px] w-full rounded-md md:h-[265px]"
            />
          )
        })}
      </section>
    </div>
  )
}
