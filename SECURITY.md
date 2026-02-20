# Security & secrets

Guidance for keeping secrets out of the repository and safe deployment.

- Do NOT commit `.env` files. Use `.env.example` for placeholders.
- Use server-only env variables (no `NEXT_PUBLIC_` prefix) for secrets.
- Rotate any credentials that may have been committed previously.
- Add CI checks (run `scripts/check-secrets.sh`) before merging.

Example local workflow:

1. Copy `.env.example` to `.env.local` and fill values.
2. Run locally: `npm run dev`.
