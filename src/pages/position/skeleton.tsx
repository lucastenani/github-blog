import {
  CalendarDots,
  CaretLeft,
  ChatCircle,
  GithubLogo,
  Link as LinkIcon,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PositionSkeleton() {
  return (
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
              <p className="flex cursor-not-allowed items-center gap-1 font-semibold uppercase text-primary">
                see on github
                <LinkIcon size={18} />
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-3xl">
              <Skeleton className="h-[40px] w-4/5 rounded-full" />
            </CardTitle>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:gap-4">
            <div className="flex items-center gap-2">
              <GithubLogo size={20} className="text-muted-foreground" />
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <CalendarDots size={20} className="text-muted-foreground" />
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <ChatCircle size={20} className="text-muted-foreground" />
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </div>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => {
          return <Skeleton key={i} className="h-[20px] w-full rounded-full" />
        })}
      </section>
    </div>
  )
}
