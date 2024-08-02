import { Outlet } from 'react-router-dom'

import effectPath from '@/assets/effect.svg'
import effect2Path from '@/assets/effect-2.svg'
import logoPath from '@/assets/logo.svg'

export function AppLayout() {
  return (
    <div className="w-screen">
      <header className="hidden w-full items-center justify-between bg-blue-950 md:flex md:py-8">
        <img
          src={effectPath}
          alt="Effect Image"
          className="h-auto max-w-full md:max-w-[409px]"
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
          className="h-auto max-w-full md:max-w-[371]"
        />
      </header>

      <main className="container mx-auto w-screen px-4 pb-10 pt-2 md:-mt-16 md:px-4 lg:w-1/2">
        <Outlet />
      </main>
    </div>
  )
}
