'use client'
import Link from "next/link";
import {HeartIcon} from "@heroicons/react/24/outline";
import {MobileMenu} from "@/app/components/mobile-menu";
import React from "react";

export function Navbar(): React.ReactElement {

    return (
        <header className="max-w-3xl top-0 z-50 w-full border-b border-border">
            <nav className="w-full">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex text-white items-center space-x-2">
                            <HeartIcon/>
                            <span className="text-lg text-primary-foreground">@nicolepoetry</span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="https://www.takealot.com/all?filter=Author:Nicole+Kazembe" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                                Poetry
                            </Link>
                            <Link href="https://www.takealot.com/all?filter=Author:Nicole+Kazembe" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                                Explore
                            </Link>
                            <Link href="https://www.takealot.com/all?filter=Author:Nicole+Kazembe" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                                Shop
                            </Link>
                            <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg hover:bg-primary/90 hover:text-primary-foreground transition-colors">
                                Get Started
                            </button>
                        </div>
                        <MobileMenu />
                    </div>
                </div>
            </nav>
        </header>
    )
}