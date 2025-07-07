import {ReactElement} from "react";
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

interface HeroCardProps {
    title: string;
    description: string;
    href?: string;
    linkText?: string;
}

export default function HeroCard({
    title,
    description,
    href = "/",
    linkText = "Learn more"
}: HeroCardProps): ReactElement {
    return (
        <article className="hero-content flex flex-col justify-between max-w-xl h-full p-6 bg-card rounded-lg border border-border">
            <div className="flex-1">
                <header>
                    <h3 className="text-xl font-semibold text-primary-foreground mb-4 leading-tight">
                        {title}
                    </h3>
                </header>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            <footer className="flex justify-end mt-6">
                <Link
                    href={href}
                    className="group relative inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md transition-all duration-300 ease-in-out hover:border-border hover:bg-accent"
                    aria-label={linkText}
                >
                    <span className="sr-only">{linkText}</span>
                    <ArrowUpRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                </Link>
            </footer>
        </article>
    )
}