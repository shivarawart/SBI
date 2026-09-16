search-engine/
├── public/
│   ├── images/
│   │   └── hero.jpg
│   └── videos/
│
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home / Search
│   │   ├── search/
│   │   │   └── page.tsx             # Search results
│   │   ├── owner/
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Owner login
│   │   │   └── dashboard/
│   │   │       └── page.tsx         # Upload / Update / Delete
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSearch.tsx
│   │   ├── SearchBar.tsx
│   │   ├── VideoCard.tsx
│   │   ├── VideoGrid.tsx
│   │   ├── Stats.tsx
│   │   └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── videos.ts                # Video CRUD logic
│   │   ├── analytics.ts             # Visits / searches / views
│   │   └── auth.ts                  # Temporary owner login
│   │
│   ├── hooks/
│   │   └── useVideos.ts
│   │
│   ├── animations/
│   │   ├── hero.ts
│   │   ├── scroll.ts
│   │   └── page.ts
│   │
│   └── types/
│       └── index.ts
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts