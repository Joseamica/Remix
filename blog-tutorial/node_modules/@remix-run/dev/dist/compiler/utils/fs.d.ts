export declare function writeFileSafe(file: string, contents: string): Promise<string>;
export declare function writeFilesSafe(files: {
    file: string;
    contents: string;
}[]): Promise<string[]>;
export declare function createTemporaryDirectory(baseDir: string): Promise<string>;
