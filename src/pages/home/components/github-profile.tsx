import {
  GithubLogo,
  Link as LinkIcon,
  MapPin,
  Users,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/api/get-user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function GitHubProfile() {
  const { data: profile, isFetched: isFetchedProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  })

  return isFetchedProfile ? (
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
  ) : (
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
  )
}
