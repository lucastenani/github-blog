import { Outlet } from 'react-router-dom'

import effectPath from '@/assets/effect.svg'
import effect2Path from '@/assets/effect-2.svg'
import logoPath from '@/assets/logo.svg'

export function AppLayout() {
  return (
    <div className="w-screen">
      <header className="hidden w-full items-center bg-blue-950 md:flex md:justify-center md:py-16 lg:justify-between lg:py-8">
        <img
          src={effectPath}
          alt="Effect Image"
          className="hidden h-auto max-w-full md:max-w-[409px] lg:flex"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <img
            className="h-[45px] w-[40px]"
            src={logoPath}
            alt="GitHub Blog Logo"
          />
          <h1 className="text-2xl font-bold uppercase text-primary">
            GitHub Blog
          </h1>
        </div>

        <img
          src={effect2Path}
          alt="Effect Image"
          className="hidden h-auto max-w-full md:max-w-[371] lg:flex"
        />
      </header>

      <main className="container mx-auto w-screen px-4 pb-96 pt-2 md:-mt-10 md:w-4/5 md:px-4 md:pb-40 lg:-mt-16 lg:w-1/2">
        <Outlet />
      </main>
    </div>
  )
}
