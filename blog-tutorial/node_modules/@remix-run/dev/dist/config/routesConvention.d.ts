import type { RouteManifest } from "./routes";
export declare function isRouteModuleFile(filename: string): boolean;
/**
 * Defines routes using the filesystem convention in `app/routes`. The rules are:
 *
 * - Route paths are derived from the file path. A `.` in the filename indicates
 *   a `/` in the URL (a "nested" URL, but no route nesting). A `$` in the
 *   filename indicates a dynamic URL segment.
 * - Subdirectories are used for nested routes.
 *
 * For example, a file named `app/routes/gists/$username.tsx` creates a route
 * with a path of `gists/:username`.
 */
export declare function defineConventionalRoutes(appDir: string, ignoredFilePatterns?: string[]): RouteManifest;
export declare function createRoutePath(partialRouteId: string): string | undefined;
