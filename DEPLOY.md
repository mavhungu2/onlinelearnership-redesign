# Deploying to Firebase App Hosting

This is the modern Firebase product for Next.js apps — it handles SSR, image optimisation, environment variables and zero-downtime rolling deploys, all triggered by `git push` to GitHub.

## Prerequisites — already done

- ✅ Project pushed to GitHub at `mavhungu2/onlinelearnership-redesign`
- ✅ `apphosting.yaml` committed (env vars + runtime config)
- ✅ Firebase CLI installed locally (`firebase --version` → 15.6.0)

## One-time setup (do this once in the Firebase Console)

### 1. Create a Firebase project (or pick an existing one)

1. Go to <https://console.firebase.google.com>
2. Click **Add project** → name it `onlinelearnership` (or use an existing project).
3. You can skip Google Analytics for a content site.

### 2. Upgrade to the Blaze (pay-as-you-go) plan

App Hosting requires Blaze — but for a content site like this, the **free tier** covers normal traffic:

- 360 vCPU-hours / month free
- 0.5 GiB-hours memory free
- 10 GB egress / month free

Click the **Spark/Blaze** toggle at the bottom-left of the Firebase Console and switch to Blaze. Set a budget alert (e.g., $5/month) so you get an email if anything unexpected happens.

### 3. Create the App Hosting backend

1. In the Firebase Console, open **Build → App Hosting**.
2. Click **Get started**.
3. Choose your GitHub repo: `mavhungu2/onlinelearnership-redesign`.
4. Pick the **main** branch as the live branch.
5. Pick a **region** — `africa-south1` (Johannesburg) for the lowest latency to SA users.
6. Backend ID: `onlinelearnership-web` (or anything memorable).
7. Click **Finish and deploy**.

The first build takes about 4–6 minutes. Subsequent builds are 2–3 minutes.

When it's done you'll get a URL like:
- `https://onlinelearnership-web--onlinelearnership.web.app`
- and `https://onlinelearnership-web--onlinelearnership.europe-west4.hosted.app`

Open it — that's your live redesign.

## Connect your custom domain (when you're ready)

1. In **App Hosting**, click your backend → **Custom domains** → **Add a custom domain**.
2. Enter `new.onlinelearnership.co.za` (a subdomain is safest while testing).
3. Firebase will give you a DNS record to add — typically an **A record** pointing to a Google IP, or a **CNAME**.
4. Add that record at your DNS host (likely the same place your existing WordPress DNS lives — Afrihost, Webafrica, GoDaddy, etc.).
5. Wait 5–60 minutes for DNS propagation. Firebase auto-provisions an SSL certificate.

### Eventually swapping to the main domain

Once you've tested at the subdomain for a week and you're happy:

1. **Move WordPress to a subdomain** — typically `wp.onlinelearnership.co.za`. Your DNS host or WP host should be able to do this in their control panel.
2. **In Firebase App Hosting**, add `onlinelearnership.co.za` (and `www.onlinelearnership.co.za`) as custom domains.
3. **Update your main DNS record** to point at Firebase instead of the WordPress host.

The new site keeps fetching content from `https://www.onlinelearnership.co.za` (the old WP) — so you need to update `WORDPRESS_URL` in `apphosting.yaml` to `https://wp.onlinelearnership.co.za` *before* you do the DNS swap. Commit, push, wait for the deploy, then swap DNS.

## Updating the live site

```bash
git add .
git commit -m "Your change"
git push
```

Firebase App Hosting automatically rebuilds and deploys every push to `main`. Pull requests get preview URLs.

## Common issues

**Build failing on App Hosting**: check the build logs in the Firebase Console. Most often it's a missing env var — add it under **App Hosting → backend → Settings → Environment variables**, or to `apphosting.yaml` and push.

**WP fetch failing in production**: WordPress is fine, but maybe your hosting blocks server-to-server requests. Check the Cloud Logging output in Firebase.

**WhatsApp / logos not loading**: third-party CDN block. Should work — the URLs we use are public.

## Rollback

In the App Hosting console → click your backend → **Rollouts** → pick a previous successful rollout → **Make active**. Instant rollback.
