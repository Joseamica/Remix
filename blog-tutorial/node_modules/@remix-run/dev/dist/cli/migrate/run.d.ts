import type { Flags } from "./flags";
export declare const run: (input: {
    flags: Flags;
    migrationId: string;
    projectDir: string;
}) => Promise<void>;
