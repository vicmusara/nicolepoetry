
import React from 'react'
import Link from 'next/link'



export const Logo = () => {
  return (
    <>
      <Link href="/" aria-label="Nicole Kazembe Home">
        <div className="text-center text-foreground uppercase transition-colors hover:text-primary">
          <p className="text-xs font-light uppercase tracking-[0.3em] leading-none">Nicole</p>
          <p className="text-2xl font-medium uppercase leading-tight tracking-tight">Kazembe</p>
        </div>
      </Link>
    </>

  )
}
