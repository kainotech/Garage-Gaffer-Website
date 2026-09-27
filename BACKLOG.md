# Backlog

Deferred for after MVP launch. Nothing here blocks going live — these are
things to come back to once the site is getting real bookings.

## Accounts / Sign in

There's no accounts system yet. The "Sign In" button (nav bar, mobile menu,
footer) and the "Already have an account?" link on the booking form were
removed for launch rather than shipped as dead buttons. Build a real
sign-in/account system, then bring these back.

## Real payment processing

Step 4 of booking no longer asks for card details — it was collecting a
card number, expiry and CVV that went nowhere (no payment processor was
wired up, and nothing was ever charged), which contradicted the site's own
promise that customers are "only charged once the work is complete." For
now, Step 4 is just a "Confirm booking" step with no payment fields.

Before launch needs a real answer to *how* payment actually happens once a
job is done (take payment in person / send an invoice / charge a card on
file), and if it's the latter, real payment processor integration (e.g.
Stripe) needs building — not a fake form.

## Unverified warranty claim — needs a real answer before launch

The site claims a "12-month workmanship warranty" as settled fact in six
places, but this was never actually confirmed as real business policy — it
looks like placeholder copy that got treated as truth and copied around.
Needs a decision: is there an actual warranty (and if so, how long, what
does it cover), or should this be removed/softened everywhere until there
is one? Until decided, don't add any more warranty claims elsewhere.

Locations: `src/components/FAQ.tsx`, `src/app/how-it-works/page.tsx`,
`src/components/how-it-works/HowItWorksFAQ.tsx`,
`src/components/support/SupportCategories.tsx`,
`src/components/support/SupportFAQ.tsx` (the homepage `Why.tsx` instance
has already been fixed).

Related: the homepage used to also claim quoted prices include "parts,
labour, VAT, all of it" — this contradicts the actual booking flow (Step 4
quotes labour only upfront, parts are quoted separately within a day). That
line has been corrected on the homepage, but the same "full price incl.
parts" framing also appears in `src/components/HowItWorks.tsx` and
`src/components/FAQ.tsx` and should be checked against the real flow too.

## Content to confirm with the founders

- **About page**: founder name and co-founder name are still literal
  placeholder text (`[FOUNDER NAME]` / `[CO-FOUNDER NAME]`).
- **About page**: the list of covered Bristol postcodes hasn't been
  confirmed as accurate yet (flagged inline in the code as "confirm with
  founder before publishing").
- **Footer**: phone number (`0117 000 0000`) is a placeholder and isn't a
  working link yet. Swap in the real number and wire it up as a `tel:`
  link (the support email, `support@garagegaffer.co.uk`, is already real
  and in use).
- **How It Works page**: the "4.9★ across all completed Bristol jobs" stat
  and the three customer reviews (Marcus B., Claire H., Tom R.) read as
  real social proof — confirm these are genuine before launch, or replace/
  remove them if there's no completed-jobs history yet.

## Legal pages

Footer links to Privacy, Terms and Cookies policies all currently go
nowhere (`#`). The booking form collects names, addresses, phone numbers
and (from Step 3) availability — worth having at least a basic privacy
policy live before real customers start submitting that.

## Other loose ends noticed during the launch cleanup

- **Help Centre content**: the Support page's "Popular articles" section
  was removed rather than shipped with 8 links that went nowhere — there's
  no real help-article content yet. Rebuild this once there are real
  articles to link to. (The mechanic "quick links" on the same page were
  kept but all point to the general `/become-a-mechanic` page for now,
  since there's no dedicated help content for mechanics yet either.)
- **Become a Mechanic page / Support page copy**: these still describe a
  "mechanics bid on jobs, you pick one on price/reviews" marketplace model
  (e.g. "keep 100% of your quote", "pick the jobs you want"). The customer-
  facing About and How It Works pages were rewritten to match the real
  instant-price booking flow, but these two weren't in scope for this pass
  and still carry the old narrative — worth a similar pass.
- **Social links**: Instagram/Facebook/X/TikTok icons in the footer don't
  point to real profiles yet.
- **Careers**: footer previously had a dead "Careers" link with no page
  behind it — removed rather than backlogged, since there's no hiring
  process to link to yet. Re-add if that changes.


## Postalcode use
https://postcodes.io/docs/api/lookup-postcode
https://github.com/ideal-postcodes/postcodes.io