import { http, HttpResponse } from 'msw'

type UserProfileResponse = {
  avatar_url: string
  login: string
  name: string | null
  bio: string
  location: string | null
  followers: number
}

const user: UserProfileResponse = {
  avatar_url: 'https://github.com/lucastenani.png',
  login: 'lucastenani',
  name: 'Lucas Tenani',
  bio: 'Full Stack Developer passionate about technology and innovation.',
  location: 'São Paulo, Brazil',
  followers: 1500,
}

export const userProfileMock = http.get<never, never, UserProfileResponse>(
  '/users/frontendbr',
  async () => {
    return HttpResponse.json(user)
  },
)
