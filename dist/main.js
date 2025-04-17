"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const morgan = require("morgan");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(morgan('dev'));
    app.enableCors({
        origin: 'http://localhost:5001',
        methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map