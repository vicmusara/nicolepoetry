import {ReactElement} from "react";
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

interface HeroCardProps {
    title: string;
    description: string;
}
export default function HeroCard({ title, description }: HeroCardProps): ReactElement {
    return (
        <div className="hero-content flex flex-col justify-between max-w-xl h-full">
            <div>
                <div>
                    <h3 className="text-primary-foreground mb-4 leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <Link
                    href="/"
                    // href="/signup"
                    className="group relative w-full p-0 rounded-none transition-all duration-300 ease-in-out hover:border-outline"
                >
                    <ArrowUpRightIcon className="w-5 h-full text-muted-foreground group-hover:bg-accent group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                </Link>
            </div>
        </div>
    )
}