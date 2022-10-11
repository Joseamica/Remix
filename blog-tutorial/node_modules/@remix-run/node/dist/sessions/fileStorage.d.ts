import type { SessionStorage, SessionIdStorageStrategy } from "@remix-run/server-runtime";
interface FileSessionStorageOptions {
    /**
     * The Cookie used to store the session id on the client, or options used
     * to automatically create one.
     */
    cookie?: SessionIdStorageStrategy["cookie"];
    /**
     * The directory to use to store session files.
     */
    dir: string;
}
/**
 * Creates a SessionStorage that stores session data on a filesystem.
 *
 * The advantage of using this instead of cookie session storage is that
 * files may contain much more data than cookies.
 *
 * @see https://remix.run/api/remix#createfilesessionstorage-node
 */
export declare function createFileSessionStorage({ cookie, dir, }: FileSessionStorageOptions): SessionStorage;
export {};
