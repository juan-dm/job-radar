// Next.js runs this file in the browser before the page becomes interactive.
// It starts PostHog analytics. See docs/decisions.md for why it is set up this way.
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// No key means no analytics. The key is only set on Vercel Production,
// so local dev and preview deploys don't skew the numbers.
if (key) {
  posthog.init(key, {
    api_host: "https://eu.i.posthog.com", // EU servers (the default is US)
    defaults: "2026-08-30", // pinned version of PostHog's recommended behaviour
    cookieless_mode: "always", // no cookies or local storage, so no consent banner needed
  });
}
