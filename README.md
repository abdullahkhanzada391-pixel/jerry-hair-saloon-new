# Jerry Hair Saloon — Premium Men's Salon & Grooming Lounge

A production-ready website for **Jerry Hair Saloon**, located in **Neelum Block, Allama Iqbal Town, Lahore, Punjab, Pakistan**.

Built with React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, GSAP (ScrollTrigger), Lenis smooth scrolling, and Lucide Icons. Designed with an editorial, dark-charcoal & warm-cream barbershop aesthetic with brass accents.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📍 Where to Replace Details (Phone, Prices, Photos)

All business data is centralized in **one single configuration file**:
👉 `src/config/salonInfo.ts`

### 1. Phone & WhatsApp Number
Open `src/config/salonInfo.ts` (lines 24–30):
```ts
// Update these two values with your real SIM & WhatsApp number:
phone: '+92 300 4829104',        // Display format with spaces
whatsappNumber: '923004829104',   // Digits only with country code 92 (no + or spaces)
```
*Note: Also check `index.html` line 44 for the LocalBusiness JSON-LD schema phone.*

### 2. Services & Prices
Open `src/config/salonInfo.ts`:
- `FULL_PRICE_LIST`: Edit prices (e.g. `price: 600`, `priceDisplay: 'Rs 600'`), durations, and service descriptions.
- `FEATURED_SERVICES`: Update the 6 signature cards displayed on the homepage.

### 3. Barbers & Staff
Open `src/config/salonInfo.ts` (`BARBERS` array):
- Swap in real names, roles, experience, specialties, bios, and portrait photos for Jerry, Ali Raza, Usman Tariq, and Bilal Ahmed.

### 4. Photos
- Replace any Unsplash image URLs in `src/config/salonInfo.ts` (`GALLERY_PHOTOS`, `BEFORE_AFTER_DATA`, `BARBERS`, `FEATURED_SERVICES`) with your own high-resolution photography.
- You can place your own images in `public/images/` and reference them as `"/images/your-photo.jpg"`.

### 5. Timings & Friday Jummah Break
Open `src/config/salonInfo.ts` (`timings` object):
- If your hours or Friday Jummah prayer break changes, modify `openHour`, `closeHour`, `fridayJummahStart`, and `fridayJummahEnd`. The booking slot generator and live "Open Now" / "Jummah Break" status badge automatically recalculate based on Pakistan Standard Time.

---

## 🛠 Tech Stack & Architecture

- **React 18 + Vite + TypeScript**: Modern, ultra-fast development and build pipeline.
- **Tailwind CSS**: Near-black charcoal (`#121110`), warm cream (`#F4EFE8`), and brass gold (`#C9A24B`).
- **Framer Motion**: Page transitions, scroll reveals, modal multistep animations, preloader.
- **GSAP + ScrollTrigger**: Desktop horizontal pinned lookbook preview gallery.
- **Lenis**: 60fps momentum smooth scroll with reduced motion support.
- **Lucide Icons**: Clean line icons only (strictly zero emojis).
- **SEO & Schema**: Pre-configured `LocalBusiness` / `HairSalon` JSON-LD structured data with Neelum Block coordinates, opening hours, and meta tags.

