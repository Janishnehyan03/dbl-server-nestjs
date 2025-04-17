declare module 'express' {
    interface Request {
        user?: any;
    }
}
export declare const GetUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
