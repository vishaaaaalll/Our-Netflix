# OUR NETFLIX

A private, Netflix-inspired memory website for **Anusha & Vishal** — our story, from 2022 and continuing forever.

This is a static website. No backend, no database, no paid services required. It runs entirely in the browser and can be hosted for free on GitHub Pages.

---

## Table of Contents

1. [How to Run the Project](#1-how-to-run-the-project)
2. [How to Add a New Photo](#2-how-to-add-a-new-photo)
3. [How to Add a New Video](#3-how-to-add-a-new-video)
4. [How to Add a Cloudinary Image URL](#4-how-to-add-a-cloudinary-image-url)
5. [How to Add a YouTube Video ID](#5-how-to-add-a-youtube-video-id)
6. [How to Create a New Memory](#6-how-to-create-a-new-memory)
7. [How to Change the Hero Title](#7-how-to-change-the-hero-title)
8. [How to Change the Hero Image](#8-how-to-change-the-hero-image)
9. [How to Change the Relationship Start Year](#9-how-to-change-the-relationship-start-year)
10. [How to Build the Project](#10-how-to-build-the-project)
11. [How to Deploy Using GitHub Pages](#11-how-to-deploy-using-github-pages)

---

## 1. How to Run the Project

You need [Node.js](https://nodejs.org/) installed on your computer (version 18 or higher).

Open a terminal in the project folder and run:

```
npm install
npm run dev
```

This starts a local development server. Open the URL shown in your terminal (usually `http://localhost:5173`) in your browser to see the website.

---

## 2. How to Add a New Photo

1. Open the file `src/data/memories.ts` in any text editor.
2. Find the `memories` array (search for `export const memories`).
3. Copy any existing photo memory (an object that has `type: 'photo'`).
4. Paste it at the end of the array (before the closing `]`).
5. Change the values:
   - `id` — a unique name with no spaces (e.g. `"picnic-2025"`)
   - `title` — the display name
   - `description` — a short sentence
   - `date` — any date text
   - `year` — the year as text
   - `category` — a group name
   - `thumbnail` — the image URL for the card cover
   - `media` — a list of image URLs shown in the gallery
   - `tags` — search keywords

Save the file. The website updates automatically.

---

## 3. How to Add a New Video

1. Upload your video to YouTube as an **Unlisted** video.
2. Copy the video ID from the YouTube URL. For example, in `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.
3. Open `src/data/memories.ts`.
4. Copy any existing video memory (an object with `type: 'video'`).
5. Paste it at the end of the array and change:
   - `id` — a unique name
   - `title` — the display name
   - `description` — a short sentence
   - `date` and `year`
   - `category`
   - `thumbnail` — a Cloudinary or other image URL for the card cover
   - `youtubeId` — the YouTube video ID you copied in step 2
   - `tags`
   - `duration` — optional, e.g. `"02:16"`

Videos play inside the website using YouTube's embed player. They do **not** autoplay with sound.

---

## 4. How to Add a Cloudinary Image URL

1. Upload your photo to [Cloudinary](https://cloudinary.com/) (free account).
2. Copy the URL of the uploaded image. It looks like:
   ```
   https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/your-photo.jpg
   ```
3. Paste this URL into the `thumbnail` field and/or the `media` array of a memory in `src/data/memories.ts`.

Any external image URL works — Cloudinary, Pexels, Unsplash, or your own hosting.

---

## 5. How to Add a YouTube Video ID

1. Go to your video on YouTube.
2. Copy the part of the URL after `v=`. For `https://www.youtube.com/watch?v=ABC123xyz`, the ID is `ABC123xyz`.
3. Put this ID in the `youtubeId` field of a video memory in `src/data/memories.ts`.

The video plays inside the website — visitors are not redirected to YouTube.

---

## 6. How to Create a New Memory

A memory is just a block of text in `src/data/memories.ts`. Here is a complete example you can copy and modify:

**Photo memory:**
```typescript
{
  id: 'first-date',
  title: 'Our First Date',
  description: 'The day everything started.',
  date: 'June 2022',
  year: '2022',
  category: 'Our Story',
  type: 'photo',
  thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/first-date.jpg',
  media: [
    'https://res.cloudinary.com/your-cloud/image/upload/first-date-1.jpg',
    'https://res.cloudinary.com/your-cloud/image/upload/first-date-2.jpg'
  ],
  tags: ['first date', 'beginning', 'special'],
  featured: true,
  favourite: true
}
```

**Video memory:**
```typescript
{
  id: 'goa-trip',
  title: 'Our Goa Trip',
  description: 'One of our favourite adventures.',
  date: 'October 2025',
  year: '2025',
  category: 'Adventures',
  type: 'video',
  thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/goa.jpg',
  media: ['https://res.cloudinary.com/your-cloud/image/upload/goa.jpg'],
  youtubeId: 'dQw4w9WgXcQ',
  tags: ['goa', 'trip', 'adventure'],
  featured: true
}
```

Optional fields:
- `featured: true` — marks this memory for the hero spotlight
- `favourite: true` — pre-marks it as a favourite
- `duration: "02:16"` — shows a duration label on video cards
- `episode: "Chapter 1"` — shows an episode label on cards

---

## 7. How to Change the Hero Title

Open `src/data/memories.ts` and find `heroConfig` near the top.

Change these fields:
```typescript
heroTitle: 'Anusha & Vishal',      // The main line
heroTitleAccent: 'Story',          // The italic accent line
heroSubtitle: 'Because our story deserves its own streaming service.',
```

---

## 8. How to Change the Hero Image

In `src/data/memories.ts`, find `heroConfig` and change:
```typescript
heroImage: 'https://your-image-url-here.jpg',
```

Use any image URL — Cloudinary, Pexels, or your own hosting.

---

## 9. How to Change the Relationship Start Year

In `src/data/memories.ts`, find `heroConfig` and change:
```typescript
heroTimeline: '2022 — CONTINUING',
heroMeta: ['2022', 'All love', 'Continuing', 'Countless episodes'],
```

To update the story chapters, find the `chapters` array in the same file and edit the `year` and `title` fields.

---

## 10. How to Build the Project

To create the final static website files (in the `dist/` folder):

```
npm run build
```

This produces a `dist/` folder containing `index.html`, CSS, and JavaScript — everything needed to host the site. No server or backend is required.

To preview the built site locally:

```
npm run preview
```

---

## 11. How to Deploy Using GitHub Pages

### Step 1: Create a GitHub repository

1. Go to [github.com](https://github.com) and create a new repository.
2. Name it whatever you like (e.g. `our-netflix`).

### Step 2: Upload the project

Upload all project files to the repository. You can do this through the GitHub website or using Git:

```bash
git init
git add .
git commit -m "OUR NETFLIX — our story"
git branch -M main
git remote add origin https://github.com/your-username/our-netflix.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, click **Pages**.
4. Under **Source**, select **GitHub Actions** or **Deploy from a branch**.
5. If using "Deploy from a branch":
   - Branch: `main`
   - Folder: `/ (root)`
   - Click **Save**.

### Step 4: Wait for the build

GitHub will build and publish your site. After a minute or two, your site will be live at:

```
https://your-username.github.io/our-netflix/
```

### Important note about the base path

The project is configured with `base: './'` in `vite.config.ts`, which means all asset paths are relative. This ensures the site works correctly whether it is hosted at the root of a domain or in a subdirectory like `username.github.io/repo-name/`.

### The `.nojekyll` file

A `.nojekyll` file is included in the `public/` folder. This tells GitHub Pages to serve the site as-is without processing it through Jekyll. This is important because Vite produces files with underscores in their names that Jekyll would otherwise ignore.

---

## Project Structure

```
our-netflix/
├── public/
│   ├── .nojekyll          ← tells GitHub Pages not to use Jekyll
│   └── images/            ← (optional) local images
├── src/
│   ├── data/
│   │   └── memories.ts    ← ALL content lives here
│   ├── App.tsx            ← the website code
│   ├── index.css          ← styling
│   └── main.tsx           ← entry point
├── index.html
├── vite.config.ts
├── package.json
└── README.md              ← this file
```

---

## Features

- Cinematic, Netflix-inspired dark theme with red/pink accents
- Hero section with customizable title, image, and description
- Horizontal scrolling memory rows
- Photo gallery with full-screen viewer and navigation
- Video player using YouTube embeds (unlisted videos)
- Search by title, description, date, category, and tags
- Favourites saved in the browser (localStorage)
- Our Story timeline (2022 — Continuing)
- Secret surprise message (click the hidden heart or tap the logo 5 times)
- Optional background music (upload your own audio file)
- Fully responsive — desktop, laptop, tablet, iPhone, Android
- No backend, no database, no paid services
- Ready for GitHub Pages

---

## Customization Summary

Everything you need to change is in **one file**: `src/data/memories.ts`.

| What you want to change | Where in the file |
|---|---|
| Hero title | `heroConfig.heroTitle` |
| Hero image | `heroConfig.heroImage` |
| Hero subtitle | `heroConfig.heroSubtitle` |
| Hero timeline | `heroConfig.heroTimeline` |
| Hero metadata | `heroConfig.heroMeta` |
| Hero description | `heroConfig.heroDescription` |
| Surprise message | `surpriseConfig` |
| Add/edit memories | `memories` array |
| Add/edit content rows | `rows` array |
| Add/edit story chapters | `chapters` array |

---

Made with love. © 2022 — Continuing.
