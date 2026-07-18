# ResuMatch

AI-powered resume analyzer that compares your resume against a job description and gives you a match score, skill gap breakdown, and interview questions to prepare for.

**Live demo:** [resu-match-seven-liard.vercel.app](https://resu-match-seven-liard.vercel.app/)

## What it does

1. Sign up / log in.
2. Paste a job description, upload your resume (PDF/DOCX), and write a short self description.
3. The app sends all of that to Google's Gemini API with a structured prompt.
4. Gemini returns a match score, a list of skill gaps, technical & behavioral interview questions (with the intent behind each one and a suggested answer), and a day-by-day prep plan.
5. Everything is saved to your account, and shows up on your dashboard as a report you can revisit anytime.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Auth:** NextAuth (credentials provider)
- **Database:** MongoDB with Mongoose
- **AI:** Google Gemini API (`@google/genai`)
- **File parsing:** `pdf-parse` for PDFs, `mammoth` for DOCX
- **Forms & validation:** React Hook Form, Joi
- **Password hashing:** bcrypt
- **Icons:** react-icons
- **Deployment:** Vercel

## Features

- Email/password authentication with protected routes — only logged-in users can generate or view reports.
- Resume upload (PDF/DOCX) with text extraction done server-side.
- AI-generated report per submission: match score, skill gaps (with severity), technical questions, behavioral questions, and a multi-day preparation plan.
- Dashboard listing all of a user's past reports, with a responsive sidebar to switch between them.
- Report history persisted in MongoDB, tied to the logged-in user.
- Responsive layout across all pages (mobile, tablet, desktop).

## Project Structure

```
ResuMatch/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth routes, signup
│   │   └── report/        # create report, get-all, get by id
│   ├── dashboard/         # user's saved reports
│   ├── generate/          # form to submit resume + job description
│   ├── login/
│   ├── signup/
│   ├── about/
│   ├── contact/
│   ├── components/        # Navbar, Footer, SessionWrapper, etc.
│   └── globals.css
├── public/
├── postcss.config.mjs
├── next.config.mjs
└── package.json
```

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Mehdi-Chandia/ResuMatch.git
cd ResuMatch
npm install
```

Create a `.env.local` file in the root with the following (adjust names to match what's actually used in the code):

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run start
```

---

## Daily Development Log

### Day 1

- Started with backend, created the signup API and login with NextAuth
- Integrated the Gemini API and created its function to generate the desired data/output
- Tested all the APIs and checked for errors
- Completed the backend — it was a simple one, nothing complex

**In Progress:** Will move to frontend
**Challenges:** Handling Gemini was a bit challenging because it needs a properly explained prompt to get structured output. File data extraction was also a headache — using `pdf-parse` and `mammoth` for the first time was really time consuming.

---

### Day 2

- Moved to frontend after completing the API section yesterday
- Started with the navbar, then moved to the hero section / landing page
- Completed both of those, that's all for today

**In Progress:** Landing page / hero section
**Challenges:** It was simple styling, nothing complex.

---

### Day 3

- Completed the signup and login pages
- Integrated the APIs with both pages
- Moved to the creation of the generate-report page where the user uploads their details

**In Progress:** Generate report page
**Challenges:** Faced a status error during API calls from the frontend — the page kept redirecting even after wrong credentials. Turned out to be a typo in a status property on the backend.

---

### Day 4

- Wrapped up the Generate Report page on the frontend
- Implemented React Hook Form for validation
- Integrated the API and tested it end to end
- Added two more routes: one to fetch all reports, one to get a report by its id
- Added checks so only logged-in users can access protected routes

**In Progress:** Moving to the dashboard next
**Challenges:** Nothing too complex — mostly just Next.js syntax being different from plain MERN, which caused a few mistakes.

---

### Day 5

- Started the dashboard: built the sidebar and the right-side report view
- Fetched only the logged-in user's generated reports
- Displayed report details, including all questions and the prep plan
- Made a few design and implementation tweaks

**In Progress:** Wrapping up tomorrow
**Challenges:** Ran into a stubborn `.next` cache issue — stale CSS was cached, which made it look like Tailwind classes had stopped working. Took a while to track down, fixed by clearing the `.next` folder.

---

### Day 6

- Final day — wrapped the app up, and it's now complete
- Added new pages: About, Contact, and a Footer
- Added a bit of animation with the help of Claude AI
- A few more small changes

**In Progress:** App is essentially complete, will revisit if anything needs changing
**Challenges:** No challenges today
---
