export class Env {
    // 1. Agar environment variable nahi milta, toh error throw karega (No silent failures)
    public static readonly BASE_URL: string = Env.getEnvVariable('BASE_URL');
    public static readonly USERNAME: string = Env.getEnvVariable('TEST_USERNAME');
    public static readonly PASSWORD: string = Env.getEnvVariable('TEST_PASSWORD');

    /**
     * Ek helper method jo check karega ki variable loaded hai ya nahi.
     * Agar loaded nahi hai, toh test ko pehle hi rok dega taaki galat execution na ho.
     */
    private static getEnvVariable(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`❌ Critical Error: Environment variable '${key}' is missing! Please check your .env file.`);
        }
        return value;
    }

    // 2. Ek clean method debug karne ke liye jise aap test ke shuru me call kar sakte hain
    public static printEnvDetails(): void {
        console.log("-----------------------------------------");
        console.log(`🌍 ACTIVE ENVIRONMENT: ${process.env.ENV?.toUpperCase() || 'DEV (DEFAULT)'}`);
        console.log(`🔗 BASE_URL: ${this.BASE_URL}`);
        console.log(`👤 USERNAME: ${this.USERNAME}`);
        console.log(`🔑 PASSWORD: ${this.PASSWORD ? '****** (Loaded)' : 'NOT LOADED'}`);
        console.log("-----------------------------------------");
    }
}



// export class Env {

//     public static readonly BASE_URL: string =
//         process.env.BASE_URL ?? "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

//     public static readonly USERNAME: string =
//         process.env.TEST_USERNAME ?? "Admin";

//     public static readonly PASSWORD: string =
//         process.env.TEST_PASSWORD ?? "admin123";
// }

// console.log("BASE_URL:", process.env.BASE_URL);
// console.log("USERNAME:", process.env.TEST_USERNAME);
// console.log("PASSWORD:", process.env.TEST_PASSWORD);