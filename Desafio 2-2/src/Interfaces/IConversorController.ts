export interface IConverterController {
    converter(): Promise<{valorConvertido: number; taxa: number; } | { status: number; error: number; }>;
}