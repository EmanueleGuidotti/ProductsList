import { InjectionToken } from '@angular/core';
import { environment } from './environments/environment';

export const baseUrl: string = environment.serverUlr;
export const defaultRetryAttempts: number = 3;
export const defaultRetryDelay: number = 1000;
export const httpTimeout: number = 60000;
export const DEFAULT_HTTP_TIMEOUT: InjectionToken<number> = new InjectionToken<
	number
>('DEFAULT_HTTP_TIMEOUT');
