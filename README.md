# Nicole Poetry

A modern poetry website built with Next.js 15, Payload CMS 3, and TypeScript. This project showcases poetry and stories with a beautiful, responsive design using Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, Payload CMS 3, and TypeScript
- **Content Management**: Full-featured CMS with rich text editing using Lexical
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Built-in SEO features with meta tags and structured data
- **Image Management**: S3 storage integration for media files
- **Live Preview**: Real-time preview of content changes
- **Search Functionality**: Advanced search capabilities
- **Form Builder**: Dynamic form creation and management
- **Redirect Management**: URL redirect handling
- **Nested Documents**: Hierarchical content structure

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.4
- **CMS**: Payload CMS 3.49.0
- **Database**: MongoDB with Mongoose adapter
- **Styling**: Tailwind CSS 4.1.11
- **UI Components**: Radix UI, Lucide React, Heroicons
- **Rich Text**: Lexical editor with custom blocks
- **Storage**: AWS S3 for media files
- **Testing**: Playwright for E2E, Vitest for unit tests
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
├── blocks/                 # Content blocks for rich text
│   ├── AboutAuthor/
│   ├── ArchiveBlock/
│   ├── Banner/
│   ├── BookTiles/
│   ├── BooksSigning/
│   ├── CallToAction/
│   ├── Code/
│   ├── Content/
│   ├── Form/
│   ├── MediaBlock/
│   ├── RelatedStories/
│   └── Testimonials/
├── collections/            # Payload CMS collections
│   ├── Categories.ts
│   ├── Media.ts
│   ├── Pages/
│   ├── Stories/
│   └── Users.ts
├── components/             # Reusable React components
├── Footer/                 # Footer configuration
├── Header/                 # Header configuration
├── heros/                  # Hero section components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── plugins/                # Payload CMS plugins
├── search/                 # Search functionality
└── utilities/              # Helper functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js ^18.20.2 or >=20.9.0
- pnpm ^9 or ^10
- MongoDB database
- AWS S3 bucket (for media storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vicmusara/nicolepoetry.git
   cd nicolepoetry
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URI=your_mongodb_connection_string
   PAYLOAD_SECRET=your_payload_secret
   S3_BUCKET=your_s3_bucket_name
   S3_ACCESS_KEY_ID=your_s3_access_key
   S3_SECRET=your_s3_secret_key
   S3_ENDPOINT=your_s3_endpoint
   CRON_SECRET=your_cron_secret
   ```

4. **Generate types**

   ```bash
   pnpm run generate:types
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run all tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:int` - Run integration tests
- `pnpm generate:types` - Generate Payload types
- `pnpm generate:importmap` - Generate import map

## 🎨 Content Management

### Collections

- **Pages**: Static pages with rich content
- **Stories**: Poetry and story content with categories
- **Categories**: Content categorization
- **Media**: Image and file management
- **Users**: User management and authentication

### Content Blocks

The site supports various content blocks for rich text editing:

- **Banner**: Hero sections and promotional content
- **AboutAuthor**: Author information and bios
- **BookTiles**: Book showcase and listings
- **BooksSigning**: Event and signing information
- **CallToAction**: Engagement and conversion elements
- **Code**: Code snippets and technical content
- **Content**: General content sections
- **Form**: Dynamic form creation
- **MediaBlock**: Image and media galleries
- **RelatedStories**: Related content recommendations
- **Testimonials**: Customer and reader testimonials

## 🔧 Development

### Adding New Content Blocks

1. Create a new directory in `src/blocks/`
2. Add `Component.tsx` for the React component
3. Add `config.ts` for Payload CMS configuration
4. Register the block in the rich text editor

### Customizing Styles

The project uses Tailwind CSS with custom CSS variables defined in `src/cssVariables.js`. Modify these variables to customize the design system.

### Environment Configuration

Key environment variables:

- `DATABASE_URI`: MongoDB connection string
- `PAYLOAD_SECRET`: Secret for Payload CMS
- `S3_BUCKET`: AWS S3 bucket name
- `S3_ACCESS_KEY_ID`: AWS access key
- `S3_SECRET`: AWS secret key
- `S3_ENDPOINT`: S3 endpoint URL
- `CRON_SECRET`: Secret for cron job authentication

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Using Vitest
- **Integration Tests**: API and component testing
- **E2E Tests**: Using Playwright for full user journey testing

Run tests with:

```bash
pnpm test
```

## 🚀 Deployment

### Docker Deployment

The project includes Docker configuration:

```bash
docker-compose up -d
```

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using Next.js, Payload CMS, and Tailwind CSS
