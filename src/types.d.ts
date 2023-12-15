// typings/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: AuthenticatedUser | undefined;
  }
}

declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}
  