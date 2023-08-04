export interface IConverterController {
    converter(): Promise<number | { status: number; error: number; }>;
}