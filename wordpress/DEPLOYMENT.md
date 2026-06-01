# SpinesTech — Production cutover checklist

## WordPress (استضافتك)

- [ ] SSL active
- [ ] Plugin `spinestech-headless` activated
- [ ] ACF + Polylang + WP Mail SMTP configured
- [ ] Permalinks: Post name
- [ ] SpinesTech → form notification email set
- [ ] CORS origins include production + Vercel preview URLs
- [ ] Test `GET .../health` returns `ok`
- [ ] Test contact form POST from browser network tab
- [ ] Content entered AR + EN for all CPTs

## Vercel (الفرونت)

Environment variables:

```env
VITE_API_URL=https://YOUR-WP-DOMAIN/wp-json/spinestech/v1
VITE_USE_MOCKS=false
VITE_SITE_URL=https://spinestech.sa
VITE_GA_ID=G-XXXXXXXXXX
```

- [ ] Redeploy after env change
- [ ] Verify `/services`, `/products`, `/about` load from API
- [ ] Verify consultation modal submits successfully
- [ ] Verify careers form uploads resume
- [ ] No CORS errors in console

## Rollback

If issues occur, set `VITE_USE_MOCKS=true` on Vercel and redeploy — site returns to static mock data immediately.
