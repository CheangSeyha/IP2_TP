import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notify(event: string, payload: any) {
    console.log(`${event} Notification sent with payload:`, payload);
  }
}
