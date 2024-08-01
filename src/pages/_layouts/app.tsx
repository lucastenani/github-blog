import { Outlet } from 'react-router-dom'

import effectPath from '@/assets/effect.svg'
import effect2Path from '@/assets/effect-2.svg'
import logoPath from '@/assets/logo.svg'

export function AppLayout() {
  return (
    <div className="w-screen">
      <header className="hidden w-full items-center justify-between bg-blue-950 lg:flex lg:py-8">
        <img
          // className="h-[45px] w-[40px]"
          src={effectPath}
          alt="Effect Image"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <img
            className="h-[45px] w-[40px]"
            src={logoPath}
            alt="GitHub Blog Logo"
          />
          <h1 className="text-primary text-2xl font-bold uppercase">
            GitHub Blog
          </h1>
        </div>

        <img
          // className="h-[45px] w-[40px]"
          src={effect2Path}
          alt="Effect Image"
        />
      </header>

      <main className="container mx-auto w-screen p-6 lg:-mt-14 lg:w-1/2 lg:px-4">
        <Outlet />
      </main>
    </div>
  )
}
