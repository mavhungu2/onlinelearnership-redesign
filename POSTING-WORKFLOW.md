# How to post jobs

Your redesign at `onlinelearnership-redesign/` pulls live data from your existing WordPress site at **https://www.onlinelearnership.co.za**. You keep posting jobs the same way you do today — the new site picks them up automatically.

## The daily workflow

1. **Log in** to `https://www.onlinelearnership.co.za/wp-admin`
2. **Add New Post** as usual — title, content, featured image, category
3. **Publish**
4. Within 5 minutes the post appears on the redesign automatically (homepage, listings, and its own detail page at `/opportunities/<slug>`).

No re-deploy. No second login. No duplicated work.

### Want it instant instead of 5 minutes?

The 5-minute window is set by `WORDPRESS_REVALIDATE_SECONDS=300` in `.env.local`. Lower it to `60` for near-instant, or hit the on-demand revalidation endpoint (we can add this — ask if you want it).

## What WordPress posts get out of the box

Today, with no plugins added, the redesign automatically extracts:

| Field | Source |
| --- | --- |
| Title | WP post title |
| Description | WP excerpt |
| Category | WP primary category |
| Posted date | WP publish date |
| Featured image / image | (currently shows org initials — extend later) |
| Apply URL | Falls back to the original WP post URL |
| Tags | WP post tags |
| **Type** (learnership / internship / bursary / etc.) | Auto-detected from category slug OR title keywords |
| **Location** (province) | Auto-detected from title/excerpt text (e.g. "Cape Town" → Western Cape) |
| **Min. qualification** | Auto-detected from text (e.g. "matric" → Grade 12 / Matric) |
| **Closing date** | Tries to parse "closes 31 July 2026" patterns, else falls back to 60 days after publish |

This means **every existing post on your site already renders** — just sometimes with best-guess values.

## Unlock the rich cards (recommended, 15 min setup)

To get reliable structured data (real closing dates, stipends, durations, polished apply-now buttons), install the free **Advanced Custom Fields** plugin on your WordPress and create one field group. Once installed, the redesign automatically uses these fields and stops guessing.

### Step 1 — install ACF
1. WordPress admin → **Plugins → Add New**
2. Search for **"Advanced Custom Fields"** by WP Engine
3. **Install Now** → **Activate**
4. (Optional but recommended) install **"ACF to REST API"** so the fields appear in the JSON the redesign reads.

### Step 2 — create the Field Group

ACF menu → **Field Groups → Add New**

Name it: **"Opportunity Details"**

Add these fields exactly (the field names must match — they're case-sensitive):

| Label | Field Name | Type | Notes |
| --- | --- | --- | --- |
| Opportunity Type | `opportunity_type` | Select | Choices: `learnership`, `internship`, `bursary`, `graduate`, `apprenticeship`, `government` |
| Organisation | `organisation` | Text | e.g. "Sasol" |
| Location | `location` | Select | Choices: `Gauteng`, `Western Cape`, `KwaZulu-Natal`, `Eastern Cape`, `Free State`, `Limpopo`, `Mpumalanga`, `North West`, `Northern Cape`, `Nationwide` |
| Closing Date | `closing_date` | Date Picker | Return format: `Y-m-d` |
| Stipend | `stipend` | Text | e.g. "R 6 500 / month" |
| Duration | `duration` | Text | e.g. "12 months" |
| Min. Qualification | `min_qualification` | Select | Choices: `Grade 10`, `Grade 11`, `Grade 12 / Matric`, `Certificate`, `Diploma`, `Degree`, `Postgraduate` |
| Apply URL | `apply_url` | URL | The direct application link |
| Featured? | `featured` | True/False | Pins to the homepage Featured section |
| Requirements | `requirements` | Textarea | One requirement per line |
| Responsibilities | `responsibilities` | Textarea | One responsibility per line |
| How to Apply | `how_to_apply` | Textarea | One step per line |

**Location rules** → Show this field group if **Post Type is equal to Post**.

### Step 3 — done

Edit any existing post, fill in the new fields at the bottom, **Update**. The redesign will pick them up on the next cache cycle and render the polished card with real closing date, stipend, structured requirements, etc.

## Categories matter

The redesign uses your WordPress categories to determine the **type** of opportunity. To make auto-detection bulletproof, make sure your category slugs are one of: `learnerships`, `internships`, `bursaries`, `graduate-programmes`, `apprenticeships`, `government-jobs`.

You can rename the display name to anything you want — only the slug is matched.

## Featured posts on the homepage

A post becomes "Featured" (shown in the top 3 hero cards on the homepage) when either:
- The ACF `featured` field is set to true, OR
- The post is marked as **Sticky** in WordPress (Post → Visibility → Stick to top)

## Troubleshooting

**A new post hasn't appeared yet**
Wait up to `WORDPRESS_REVALIDATE_SECONDS` (default 300 = 5 min). Then hard-refresh.

**A post shows the wrong type / location**
Add ACF fields (`opportunity_type`, `location`) to that post for an explicit override. Or improve the post title / first paragraph to include the keyword (e.g. "in Cape Town").

**The whole site is empty or showing old data**
Check the dev server logs for `[wp] …` errors. The redesign falls back to mock data if WordPress returns an error, so the site never goes blank.

**Want a self-serve employer portal instead?**
That needs a real account system + admin moderation queue + (optionally) payment. Roughly 2–3 days of work — let me know when you want to add it.

## Environment

The integration is configured via `.env.local`:

```bash
WORDPRESS_URL=https://www.onlinelearnership.co.za
WORDPRESS_REVALIDATE_SECONDS=300
```

To point at a staging WP first, just change `WORDPRESS_URL`. The integration is read-only — nothing in this redesign can edit or delete anything on your WordPress site.
