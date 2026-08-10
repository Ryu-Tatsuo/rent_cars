# Single Prompt: Build a Car Sales Agency Website
You are building a full-featured car sales agency website using Next.js 14 (App Router) and Tailwind CSS. The site serves as a dealership's digital storefront with a searchable inventory.

## Project Setup
- Initialize: `npx create-next-app@latest car-dealership --typescript --tailwind --app --src-dir`
- No additional major libraries needed — use native Next.js features (Server Components, Route Handlers, Image component).
- For icons, use `lucide-react` (npm install lucide-react).

## File Structure
src/
  app/
    layout.tsx          # Root layout with header + footer
    page.tsx            # Home page (hero, featured cars, quick links)
    about/page.tsx      # About the dealership
    contact/page.tsx    # Contact form
    inventory/
      page.tsx          # Full inventory with search/filter (query params)
      id/page.tsx     # Single car detail page
  components/
    Header.tsx          # Navbar with logo, nav links, mobile hamburger
    Footer.tsx          # Footer with contact info, hours, links
    CarCard.tsx         # Card component for inventory grid
    SearchFilters.tsx   # Filter sidebar/drawer for make, model, year, price, fuel, mileage
    HeroSection.tsx     # Home page hero with CTA
    ContactForm.tsx     # Form with name, email, phone, message
  data/
    cars.ts             # Array of car objects (seed data — 12+ cars)
  types/
    index.ts            # TypeScript types for Car, FilterState, etc.

## Data Model (types/index.ts)
```typescript
export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid"
export type Transmission = "Automatic" | "Manual"

export interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: FuelType
  transmission: Transmission
  color: string
  image: string
  description: string
  features: string[]
  condition: "New" | "Used" | "Certified Pre-Owned"
}

export interface FilterState {
  make?: string
  model?: string
  minYear?: number
  maxYear?: number
  minPrice?: number
  maxPrice?: number
  fuelType?: FuelType
  condition?: string
}
Seed Data (data/cars.ts)
- Create 12-16 realistic car objects with real makes/models (Toyota Camry, Honda Civic, BMW 3 Series, Tesla Model 3, Ford F-150, etc.).
- Use https://images.unsplash.com/photo-{id}?w=800&q=80 for car images. Pick real Unsplash car photo IDs.
- Vary prices ($15,000-$80,000), years (2019-2025), mileages, fuel types, and conditions.
Pages & Components
layout.tsx
- Import and render <Header /> and <Footer /> wrapping {children}.
- Import Inter from next/font/google and apply it.
- Set metadata title/description for SEO.
Header.tsx (Client Component)
- Logo/brand name on the left linking to "/".
- Nav links: Home, Inventory, About, Contact.
- Mobile hamburger menu using lucide-react Menu/X icons.
- Active link highlighting using usePathname().
page.tsx (Home - Server Component)
- Hero Section: Full-width background image with overlay text: agency name, tagline, and "Browse Inventory" CTA button linking to /inventory.
- Featured Cars: Show 4-6 cars from seed data in a responsive grid using CarCard.
- Why Choose Us: 3-column grid with icon + text (e.g., "Certified Vehicles", "Financing Available", "Trade-In Program").
- Call to Action: Banner section with "Visit Us Today" and contact info.
inventory/page.tsx (Server Component)
- Read search params from URL: /inventory?make=Toyota&minPrice=20000&fuelType=Hybrid
- Parse params into FilterState.
- Filter the car array based on params.
- Render <SearchFilters /> on the left (sidebar on desktop, drawer on mobile).
- Render filtered cars as a grid of <CarCard />.
- Show "No results found" with a reset link if no cars match.
- All filter changes update URL query params (use client-side navigation with useRouter + useSearchParams for the filter component, or use a form that submits to the server page).
SearchFilters.tsx (Client Component)
- Inputs: Make (text/datalist), Model (text), Min Year, Max Year, Min Price, Max Price, Fuel Type (select), Condition (select).
- A "Apply Filters" button that updates URL search params via useRouter().push().
- A "Clear Filters" button that resets.
- On mount, initialize from useSearchParams().
- Debounce text inputs or use explicit button press.
inventory/id/page.tsx (Server Component - generateStaticParams + generateMetadata)
- Find car by id from seed data.
- generateMetadata returns dynamic title/description.
- Display: large hero image (Next/Image with priority), price badge, key specs (year, mileage, fuel, transmission, color, condition), full description, features list, and a "Contact About This Car" CTA linking to contact page with pre-filled subject.
CarCard.tsx (Server Component)
- Image (Next/Image), make + model + year, price formatted as $XX,XXX, key specs row (mileage, fuel, transmission), condition badge.
- Entire card is a Link to /inventory/{id}.
- Hover effect: slight scale + shadow.
about/page.tsx
- Dealership story/mission paragraph.
- Team section (3-4 placeholder profiles with avatar, name, role).
- Google Maps iframe embed for location (use a placeholder address).
contact/page.tsx
- ContactForm component: name, email, phone, message, and a hidden carSubject field prefilled if navigated from a car detail page (use search params).
- On submit, log to console and show a success toast/alert (no backend required — mark as "form handling placeholder").
- Contact info sidebar: address, phone, email, business hours.
Footer.tsx
- 3-column layout: Quick Links, Contact Info, Business Hours.
- Copyright line at bottom.
Styling
- Fully responsive: mobile-first with Tailwind breakpoints (sm/md/lg/xl).
- Color scheme: use a professional automotive palette — dark navy/charcoal for header/footer, white backgrounds, accent color (e.g., red or blue) for CTAs and badges.
- Smooth transitions on hover states.
- Cards use shadow-md hover:shadow-xl transition-shadow.
- Inventory page uses lg:grid-cols-3 md:grid-cols-2 grid-cols-1.
- SearchFilters on mobile: stack on top instead of sidebar.
Image Optimization
- Use next/image with width={800} height={600} for car images and appropriate sizes attribute.
- Use priority on the hero image and above-the-fold car images.
SEO
- Each page has generateMetadata with appropriate title and description.
- Inventory detail page uses car name in title.
- Open Graph meta tags on layout level.
Accessibility
- Proper heading hierarchy (h1 > h2 > h3).
- Alt text on all images.
- aria-labels on icon buttons.
- Form inputs have associated <label> elements.
- Skip-to-content link in layout.
Deployment Note
- Add a comment at the top of cars.ts: "// Replace seed data with a database (e.g., PostgreSQL via Prisma) in production."
- Add a .env.local.example with NEXT_PUBLIC_SITE_URL=http://localhost:3000.
Verification
After building, run npm run build and confirm zero errors. Check all pages render, filters update the URL and correctly filter cars, mobile menu works, and images load.

---

That's the complete single-prompt instruction for an AI agent. It covers:

- **Tech stack** & initialization
- **Full file tree** with 12 files
- **TypeScript data model** for cars
- **Seed data** with 12-16 realistic entries
- **Every page/component** with specific implementation details
- **Search/filter** via URL query params
- **Styling** guidelines with Tailwind classes
- **SEO, a11y, images, deployment** concerns
