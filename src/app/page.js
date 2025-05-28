import { MenuIcon } from 'lucide-react'
import Link from "next/link"
import { CustomButton } from "../components/home/custom-button"
import GridPattern from "../components/home/grid-pattern"
import { FloatingNav } from '@/components/ui/floating-navbar'
import { navItems } from '../utils/data'
import Header from '@/components/header'
import { IconServerBolt } from '@tabler/icons-react';
import { CircleIcon, RectIcon } from '@/components/icons/icons'
import { Grids } from '@/components/icons/grids'

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[#121212] text-[#fcfcfc] px-4 sm:px-[10%] flex flex-col items-center relative overflow-hidden">
      <Header />

      <div className="absolute h-full w-full flex items-center justify-center z-20">
        <div className="relative w-full max-w-3xl">
          <Grids />
          <div className="absolute inset-0 h-48 w-48 bg-[#3CFFA5] rounded-full blur-[100px] z-0" />
        </div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center z-20 py-20 mt-28 md:mt-0 md:py-20 text-center ">
        <div className="text-7xl lg:text-[8rem] font-bold tracking-tighter flex flex-col">
          <p className="m-0 leading-tight">Powerful</p>
          <p className="m-0 leading-tight text-[#3CFFA5] flex items-center">Database
            <span className='mt-2 ml-5 hidden sm:block'><IconServerBolt stroke={2} size={128} /></span>
            <span className='mt-3 ml-2 sm:hidden'><IconServerBolt stroke={2} size={70} /></span>
          </p>
          <p className="m-0 leading-tight">Tool</p>
        </div>
      </div>

      <Link
        href=""
        target="_blank"
        className="absolute bottom-[10%] right-[10%] z-50 hidden md:block"
      >
        <CustomButton variant="accent">Watch Tutorial</CustomButton>
      </Link>

      <Link
        href=""
        target="_blank"
        className="absolute bottom-[20%] left-[10%] z-50 hidden md:block"
      >
        <CustomButton variant="secondary">Get Started</CustomButton>
      </Link>

      <RectIcon />
      <CircleIcon />

    </div>
  )
}
