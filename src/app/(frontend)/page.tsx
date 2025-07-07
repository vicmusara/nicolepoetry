import React, { ReactElement } from "react";
import {Navbar} from "@/app/components/navbar";
import HeroCard from "@/app/components/hero-card";
import Image from "next/image";
import Link from "next/link";
import {ArrowUpRightIcon} from "@heroicons/react/24/outline";

export default function page(): ReactElement{
  return (
  <div className="flex flex-col items-center">
    <Navbar />
    <div className="mx-auto mt-20 w-full max-w-6xl px-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 md:items-start">
        <div className="order-2 md:order-1 md:col-span-1 md:mt-40">
          <HeroCard
              title="AI Assistant"
              description="Transform your ideas into compelling stories with the power of artificial intelligence. Whether you're crafting poetry, fiction, or exploring new creative territories, our AI companion is here to inspire and guide your writing journey."
          />
        </div>
        <div id="featured" className="order-1 md:order-2 md:col-span-2 border flex flex-col items items-center">
          <h1 className="text-2xl my-8 leading-tight text-primary-foreground">Featured</h1>
          <Image
              src="/assets/catchnrelease.png"
              alt="Catch and Release"
              width={600}
              height={200}
              className="border-t border-muted px-0 py-4 w-full h-auto"
          />
          <div className="flex justify-end">
            <Link
                href="https://www.takealot.com/all?filter=Author:Nicole+Kazembe"
                className="group relative w-full p-0 rounded-none transition-all duration-300 ease-in-out hover:border-outline"
            >
              <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-lg group-hover:bg-accent group-hover:text-primary group-hover:scale-110 transition-all duration-300">More Books</span>
                  <ArrowUpRightIcon className="w-5 h-5 text-muted-foreground group-hover:bg-accent group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
</div>
            </Link>
          </div>
        </div>
        <div className="order-3 md:order-3 md:col-span-1 md:mt-40">
          <HeroCard
              title="Daily Prompt"
              description="Write about a character who discovers an old letter that changes everything
                  they thought they knew about their family history. What secrets does the letter reveal,
                  and how does this discovery transform their understanding of themselves?"
          />
        </div>
      </div>
    </div>
  </div>
  )
}