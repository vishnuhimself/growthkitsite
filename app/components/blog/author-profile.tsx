import Image from 'next/image'
import Link from 'next/link'
import { Globe, Mail } from 'lucide-react'
import { AuthorProfile as AuthorProfileType } from '@/app/lib/blog-types'

interface AuthorProfileProps {
  author: AuthorProfileType
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        {author.avatar && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{author.name}</h3>
          {author.role && (
            <p className="text-sm text-primary mb-2">{author.role}</p>
          )}
          <p className="text-sm text-muted-foreground mb-4">{author.bio}</p>
          {author.social && (
            <div className="flex flex-wrap items-center gap-3">
              {author.social.website && (
                <Link
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
              {author.social.twitter && (
                <Link
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter/X"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              )}
              <Link
                href="mailto:hey@heyvish.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

