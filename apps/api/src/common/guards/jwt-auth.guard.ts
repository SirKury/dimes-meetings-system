import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '../types/request-user.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: RequestUser }>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const payload = this.decodePayload(token);

    if (!payload?.sub || !payload?.role || !payload?.establishmentId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    request.user = payload;
    return true;
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) return null;

    return token;
  }

  private decodePayload(token: string): RequestUser {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) {
        throw new Error('Token payload missing');
      }

      const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf8');
      return JSON.parse(payloadJson) as RequestUser;
    } catch {
      throw new UnauthorizedException('Unable to decode token');
    }
  }
}
