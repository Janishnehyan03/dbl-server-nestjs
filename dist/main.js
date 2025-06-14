"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const morgan = require("morgan");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(morgan('dev'));
    app.use(cors({
        origin: ['http://localhost:5001', 'https://dbl-client.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }));
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
    console.log(`CORS enabled for origins: http://localhost:5001, https://dbl-client.vercel.app`);
}
bootstrap();
//# sourceMappingURL=main.js.map