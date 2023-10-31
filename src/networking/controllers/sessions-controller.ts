import { ApiService } from '@/networking/api-service';
import { API_ROUTES } from '@/networking/api-routes';
import { CreateSession } from '@/types/session';

/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/
class SessionsController {
  static login(email: string, password: string) {
    return ApiService.post<CreateSession>(API_ROUTES.SESSIONS, {
      email,
      password
    });
  }
}

export { SessionsController };
