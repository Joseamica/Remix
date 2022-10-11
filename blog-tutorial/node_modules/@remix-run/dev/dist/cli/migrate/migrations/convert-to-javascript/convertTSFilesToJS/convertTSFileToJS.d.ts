declare type ConvertTSFileToJSArguments = {
    filename: string;
    projectDir: string;
    source: string;
};
export declare const convertTSFileToJS: ({ filename, projectDir, source, }: ConvertTSFileToJSArguments) => string;
export {};
