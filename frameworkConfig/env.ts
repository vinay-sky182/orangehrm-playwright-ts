export class Env {
    // 1. Agar environment variable nahi milta, toh error throw karega (No silent failures)
    public static readonly BASE_URL: string = Env.getEnvVariable('BASE_URL');
    public static readonly VALID_USERNAME: string = Env.getEnvVariable('TEST_USERNAME');
    public static readonly VALID_PASSWORD: string = Env.getEnvVariable('TEST_PASSWORD');
    public static readonly INVALID_USERNAME: string = Env.getEnvVariable('TEST_INVALID_USERNAME');
    public static readonly INVALID_PASSWORD: string = Env.getEnvVariable('TEST_INVALID_PASSWORD');
    /**
     * Ek helper method jo check karega ki variable loaded hai ya nahi.
     * Agar loaded nahi hai, toh test ko pehle hi rok dega taaki galat execution na ho.
     */
    private static getEnvVariable(key: string): string {
        const value = process.env[ key ];
        if (!value) {
            throw new Error(`Critical Error: Environment variable '${key}' is missing! Please check your .env file.`);
        }
        return value;
    }

    // 2. Ek clean method debug karne ke liye jise aap test ke shuru me call kar sakte hain
    /*     public static printEnvDetails(): void {
            console.log("-----------------------------------------");
            console.log(`🌍 ACTIVE ENVIRONMENT: ${process.env.ENV?.toUpperCase() || 'QA (DEFAULT)'}`);
            console.log(`🔗 BASE_URL: ${this.BASE_URL}`);
            console.log(`👤 USERNAME: ${this.VALID_USERNAME}`);
            console.log(`🔑 PASSWORD: ${this.VALID_PASSWORD ? '****** (Loaded)' : 'NOT LOADED'}`);
            // console.log(`🔑 ACTUAL PASSWORD: ${this.VALID_PASSWORD}`);
            console.log("-----------------------------------------");
        } */
}