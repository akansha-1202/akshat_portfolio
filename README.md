# Akshat Verma — Graphic Designer Portfolio

Modern single-page portfolio for **Akshat Verma** (Graphic Designer & Video Editor), built with Next.js, Tailwind CSS, GSAP, Lenis, and Three.js.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add Real Work from Google Drive

1. Download reels/images from the [client Drive folder](https://drive.google.com/drive/folders/1Ia8W1MwLhpN3DGmSyk9xv-vAcONBAlJC?usp=drive_link).
2. Place files in:
   - `public/work/anon-india/reel.mp4` + `poster.webp`
   - `public/work/pathshala/reel.mp4` + `poster.webp`
   - `public/work/the-menta/reel.mp4` + `poster.webp`
   - `public/work/video-edit/reel.mp4` + `poster.webp`
3. Update paths in `app/constants/index.js` if filenames differ.

## Contact Form (Optional)

Copy `.env.example` to `.env.local` and add EmailJS keys. Without them, the form opens the user's mail client instead.

## Deploy on Vercel

Push to GitHub and import the repo in [Vercel](https://vercel.com). No extra config needed.

## Stack

- Next.js 16 (App Router, JavaScript)
- Tailwind CSS v4
- GSAP + ScrollTrigger + Flip
- Lenis smooth scroll
- React Three Fiber (hero particles)
