import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Footer as FooterType } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import {
  TwitterIcon,
  InstagramIcon,
  Facebook01Icon,
  Linkedin01Icon,
  Link01Icon,
  YoutubeIcon,
} from 'hugeicons-react';
import Link from 'next/link'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const copyrightText =
    footerData?.copyrightText || 'Bestselling Author'
  const currentYear = new Date().getFullYear()

  // Helper to map platform to icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return TwitterIcon;
      case 'instagram':
        return InstagramIcon;
      case 'facebook':
        return Facebook01Icon;
      case 'linkedin':
        return Linkedin01Icon;
      case 'youtube':
        return YoutubeIcon;
      default:
        return Link01Icon;
    }
  };

  // Helper to check if a link is internal
  const isInternal = (url: string) => url.startsWith('/');

  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-10">
        <div className="flex flex-col items-center gap-10 border-b border-b-border pb-10 lg:flex-row lg:justify-between lg:gap-4">

          {/* Navigation */}
          <nav className=" flex justify-center lg:w-1/3 lg:justify-start">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-book sm:gap-8">
              {navItems.map(({ link }, i) => (

                  <CMSLink
                    key={i}
                    {...link}
                    appearance="link"
                    className="text-md text-foreground uppercase transition-colors hover:text-primary"
                  />
              ))}
            </ul>
          </nav>

          {/* Logo */}
          <div className="order-first flex justify-center lg:order-none lg:w-1/3">
            <Logo />
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:w-1/3 lg:justify-end">
            <div className="flex items-center gap-6">
              {socialLinks.map((social, i) => {
                const Icon = getSocialIcon(social.platform);
                const isInternalLink = isInternal(social.url);
                if (isInternalLink) {
                  return (
                    <Link
                      key={social.id || i}
                      href={social.url}
                      aria-label={social.platform}
                      className="text-foreground uppercase transition-colors hover:text-primary"
                    >
                      <Icon size={20} />
                    </Link>
                  );
                } else {
                  return (
                    <a
                      key={social.id || i}
                      href={social.url}
                      aria-label={social.platform}
                      className="text-foreground uppercase transition-colors hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={20} />
                    </a>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-sm text-foreground">
            © {currentYear} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}
