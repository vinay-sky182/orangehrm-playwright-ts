export class Env {

    public static readonly BASE_URL: string =
        process.env.BASE_URL ?? "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

    public static readonly USERNAME: string =
        process.env.TEST_USERNAME ?? "Admin";

    public static readonly PASSWORD: string =
        process.env.TEST_PASSWORD ?? "admin123";
}

console.log("BASE_URL:", process.env.BASE_URL);
console.log("USERNAME:", process.env.TEST_USERNAME);
console.log("PASSWORD:", process.env.TEST_PASSWORD);