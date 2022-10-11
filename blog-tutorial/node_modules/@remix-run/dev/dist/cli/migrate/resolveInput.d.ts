import type { Flags } from "./flags";
export declare const resolveInput: (input: {
    projectId: string;
    migrationId?: string;
}, flags: Flags) => Promise<{
    projectDir: string;
    migrationId: string;
}>;
