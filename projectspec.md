# AutoLot — Single-Dealership Vehicle Sales Platform
## Product & Engineering Specification

> Purpose of this document: a build-ready spec/prompt you can hand to a developer or an AI coding agent (e.g. Claude Code) to scaffold and implement the full platform in one coherent pass.

---

## 1. Project Summary

A production-grade, e-commerce-style website for a **single car dealership** to showcase and sell its vehicle inventory online. Customers browse, filter, compare, save, and inquire about vehicles; staff manage inventory and leads through a dashboard. **No payment processing** — the "checkout" flow ends in a lead/reservation request (deposit-to-hold is optional and non-monetary, e.g. "Request to Reserve" that notifies staff).

**Feel:** Tesla/Carvana-level polish, but content-managed like a real dealership site — fast, trustworthy, mobile-first, zero visual clutter.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router, Server Components, Server Actions) |
| Language | TypeScript (strict mode) |
| UI Kit | shadcn/ui (Radix primitives) |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod validation |
| Database | PostgreSQL (via Prisma ORM) |
| Auth | Auth.js (NextAuth) — email/password + Google OAuth; role-based (customer, staff, admin) |
| Image handling | next/image + a storage bucket (S3-compatible / Cloudinary) |
| State (client) | Zustand for cart-like "compare" & "favorites" trays; React Query for server cache where needed |
| Search/Filter | Server-side filtering with URL-driven query params (shareable, SEO-friendly filtered views) |
| Email | Resend or Postmark for lead notifications & alerts |
| Deployment | Vercel |
| Analytics | Vercel Analytics / Plausible |

---

## 3. Information Architecture / Routes

```
/                          Home
/inventory                 Full inventory (grid/list, filters, sort)
/inventory/[slug]           Vehicle detail page (VDP)
/compare                   Side-by-side comparison (up to 4 vehicles)
/favorites                 Saved vehicles (auth or local-storage guest mode)
/financing                 Loan/payment calculator (standalone + embedded on VDP)
/trade-in                  Trade-in value estimator + form
/sell-your-car              (alias of trade-in intake, optional)
/about                     Dealership story, location, hours
/contact                   Contact form, map, hours
/schedule-test-drive        Booking flow (date/time picker)
/account                   Customer: profile, saved searches, favorites, inquiry history
/auth/sign-in, /auth/sign-up

--- Staff area (role-gated) ---
/dashboard                  Overview: leads, inventory health, alerts
/dashboard/inventory         Manage listings (CRUD, bulk import, status)
/dashboard/inventory/new
/dashboard/inventory/[id]/edit
/dashboard/leads             Inquiries, trade-in requests, test-drive bookings, reservation requests
/dashboard/leads/[id]
/dashboard/users             (admin only) staff accounts & roles
/dashboard/settings          Dealership info, hours, financing rate assumptions
```

---

## 4. Core Feature Specs

### 4.1 Inventory Browse & Filter (`/inventory`)
- Filters: make, model, body type, year range, price range, mileage range, fuel type, transmission, drivetrain, exterior color, features (sunroof, AWD, leather, etc.), condition (new/used/certified).
- Filters live in the URL (`?make=toyota&year_min=2020`) — shareable, back-button safe, SEO-indexable.
- Sort: price (asc/desc), mileage, year, newest listed, most popular.
- View toggle: grid / list.
- Infinite scroll or paginated (paginated preferred for SEO + perf); skeleton loading states.
- Each card: primary photo, year/make/model/trim, price, mileage, key badges (Certified, New Arrival, Price Drop), quick-add to Compare/Favorites.
- Empty state with "clear filters" and suggested alternatives.

### 4.2 Vehicle Detail Page (VDP) (`/inventory/[slug]`)
- Image gallery: swipeable on mobile, thumbnail strip on desktop, zoom, 360° view slot (optional future).
- Sticky price/CTA panel on scroll (desktop sidebar, mobile bottom sheet): price, monthly payment estimate, "Schedule Test Drive," "Request to Reserve," "Ask a Question," Add to Favorites/Compare.
- Full spec sheet (tabs or accordion): Overview, Features & Options, Specifications, History/Condition report, Warranty info.
- Embedded financing calculator (pre-filled with vehicle price).
- "Similar Vehicles" carousel.
- Trust signals: Carfax/vehicle history badge, dealer certification, days-on-lot transparency.
- Structured data (schema.org `Vehicle` / `Product`) for SEO.

### 4.3 Compare (`/compare`)
- Persisted via Zustand + localStorage (works for guests).
- Up to 4 vehicles, spec-by-spec table, sticky headers, remove/swap actions, highlight differences toggle.

### 4.4 Favorites / Saved Vehicles
- Guest: localStorage. Authenticated: synced to DB.
- Optional "price drop" and "back in stock" email alerts per saved vehicle.

### 4.5 Financing Calculator (`/financing` + embedded)
- Inputs: vehicle price (pre-filled from VDP), down payment, trade-in value (pull from trade-in tool if completed), APR (editable, default from dealership settings), loan term (36/48/60/72 months).
- Output: estimated monthly payment, total interest, amortization summary.
- Disclaimer: "Estimate only, not a financing offer." No real credit application, no SSN, no payment processing — pure calculator + optional "Get Pre-Qualified" lead form that just captures contact info.

### 4.6 Trade-In Estimator (`/trade-in`)
- Multi-step form: VIN or year/make/model/trim → mileage, condition, features → contact info.
- Produces an **estimated range**, not a firm offer (clearly labeled), and creates a lead in the dashboard.

### 4.7 Test Drive Scheduling
- Vehicle pre-selected, date/time picker constrained to dealership hours, confirmation email, appears in staff dashboard as a lead type.

### 4.8 "Request to Reserve" (checkout-equivalent, no payment)
- Multi-step, cart-style flow but ends in a lead, not a transaction:
  1. Review vehicle
  2. Contact & preferred contact method
  3. Optional trade-in attach, optional financing pre-qualification interest
  4. Confirmation screen: "Our team will contact you within X hours to finalize your reservation."
- This is the "commerce" feel without payment rails — same polish as a checkout (progress indicator, order-summary-style sidebar showing the vehicle), just no payment step.

### 4.9 Staff Dashboard
- Inventory CRUD with multi-image upload, drag-to-reorder photos, status (available/pending/sold), bulk CSV import.
- Lead inbox unifying: contact inquiries, trade-in requests, test-drive bookings, reservation requests — with status pipeline (New → Contacted → Qualified → Closed).
- Basic KPIs: active listings, avg days on lot, leads this week, conversion rate.
- Role-based access (admin vs. sales staff).

---

## 5. Data Models (Prisma-style overview)

```
Vehicle
  id, slug, vin, make, model, trim, year, price, mileage,
  bodyType, fuelType, transmission, drivetrain, exteriorColor, interiorColor,
  condition (new|used|certified), status (available|pending|sold),
  description, features[], images[], daysOnLot, createdAt, updatedAt

Lead
  id, type (inquiry|trade_in|test_drive|reservation|financing_prequal),
  vehicleId?, customerName, email, phone, message,
  status (new|contacted|qualified|closed), assignedStaffId?, createdAt

User
  id, name, email, role (customer|staff|admin), favorites[], savedSearches[]

TradeInSubmission
  id, vin?, year, make, model, mileage, condition, estimatedLow, estimatedHigh, leadId

TestDriveBooking
  id, vehicleId, userId?, scheduledFor, status, leadId

DealershipSettings
  hours, address, phone, financingDefaultAPR, brandingColors
```

---

## 6. UI/UX & Design System Requirements

- **Component library:** shadcn/ui exclusively for primitives (Button, Card, Sheet, Dialog, Drawer, Tabs, Accordion, Command palette for search, Skeleton, Badge, Toast, Carousel, Table, Select, Slider for range filters).
- **Mobile-first, first-class** (not "responsive as an afterthought"):
  - Filters open as a bottom `Sheet`/Drawer on mobile, sidebar on desktop.
  - Sticky bottom action bar on VDP for mobile (price + primary CTA always reachable).
  - Touch-friendly tap targets (min 44px), swipeable galleries and carousels.
  - Test on 360px–430px widths first, scale up.
- **Visual direction:** clean automotive-retail aesthetic — generous whitespace, large high-quality imagery, confident typography, restrained accent color, dark-mode support via shadcn theming tokens.
- **Motion:** subtle, purposeful (Framer Motion) — page transitions, image gallery, filter panel slide-ins. Never gratuitous.
- **Accessibility:** WCAG 2.1 AA — keyboard navigable filters, proper alt text on vehicle images, focus states, semantic headings, color-contrast compliant badges.
- **Performance budget:** Lighthouse ≥ 90 mobile; images via `next/image` with responsive `sizes`, lazy loading below the fold, route-level code splitting.
- **Loading/empty/error states** designed for every data-driven view (skeletons, not spinners, where practical).
- **SEO:** per-vehicle metadata, OpenGraph images, sitemap.xml, JSON-LD structured data for vehicles and dealership (LocalBusiness).

---

## 7. Non-Functional Requirements

- **No payment integration of any kind** — explicitly no Stripe/PayPal/checkout SDKs. All monetary flows terminate in a lead capture.
- **Security:** input validation via Zod on every form/server action, rate-limiting on public forms (lead spam), image upload validation (type/size).
- **Environments:** dev / staging / production with seeded demo inventory data for dev.
- **Testing:** unit tests for calculators (financing, trade-in estimate logic), integration tests for filter/query param parsing, e2e (Playwright) for the reservation and lead flows.
- **CMS-lite:** dealership info, hours, and financing defaults editable from `/dashboard/settings` without a redeploy.

---

## 8. Suggested Build Order

1. Design tokens + shadcn theme setup, layout shell, nav/footer.
2. Prisma schema + seed data (30–50 demo vehicles).
3. Inventory list + filters (URL-driven).
4. Vehicle Detail Page.
5. Favorites + Compare (client state).
6. Financing calculator + Trade-in estimator.
7. Test-drive scheduling + Request-to-Reserve flow (lead capture).
8. Auth (customer accounts).
9. Staff dashboard (inventory CRUD, then lead inbox).
10. Polish pass: SEO metadata, accessibility audit, performance audit, mobile QA.

---

## 9. Explicit Non-Goals (v1)

- No payment/checkout processing, no deposits charged.
- No live chat/AI concierge (can be a future add-on).
- No multi-dealer/marketplace support — single inventory source.

DB details
superbase project Id--xonrqehihjbyfotrdkbx
password---O7S1iALOnKfzvSM3
connectionstring--postgresql://postgres:O7S1iALOnKfzvSM3@db.xonrqehihjbyfotrdkbx.supabase.co:5432/postgres