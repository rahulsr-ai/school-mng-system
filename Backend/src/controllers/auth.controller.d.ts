import { Request, Response } from 'express';
export declare const loginAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logoutAdmin: (req: Request, res: Response) => Promise<void>;
export declare const verifyAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controller.d.ts.map