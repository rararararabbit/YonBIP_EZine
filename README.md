<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/689e9cfa-dc95-4e9a-a2b1-4e58ca477dec

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy (prod + test on same server)

See [DEPLOY.md](DEPLOY.md). Single branch `main`:

- Prod: push to `main` (auto) → http://123.56.7.111/YonBIP_EZine/
- Test: Actions → Run workflow → `test` → http://123.56.7.111/YonBIP_EZine-test/

## Issues (月刊数据)

- 当前默认：**7月刊** → [`src/issues/vol-07/`](src/issues/vol-07/)
- 已归档固定数据：**6月刊** → [`src/issues/vol-06/`](src/issues/vol-06/)（勿与 7 月刊混改）
- 回看 6 月刊：`?issue=vol-06`（往期友情链接也会带上）
