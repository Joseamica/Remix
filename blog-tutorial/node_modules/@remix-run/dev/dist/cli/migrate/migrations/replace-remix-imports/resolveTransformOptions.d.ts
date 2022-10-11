import type { PackageJson } from "@npmcli/package-json";
import type { Options } from "./transform/options";
export declare const resolveTransformOptions: (packageJson: PackageJson) => Promise<Options>;
