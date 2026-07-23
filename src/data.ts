/**
 * Compatibility re-exports.
 * Prefer `resolveIssueFromLocation()` / issue modules under `./issues/`.
 */
export { vol07Issue as currentIssue, vol07Issue } from "./issues/vol-07/issue";
export { vol06Issue } from "./issues/vol-06/issue";
import { vol07Issue } from "./issues/vol-07/issue";

/** @deprecated Use the current issue's `articles` via `./issues`. */
export const initialArticles = vol07Issue.articles;
