import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpOptions } from '@capacitor/core';
import { Observable, tap } from 'rxjs';
import { ServiceKey } from '../models/common/server';
import { ConfigUrlService } from './config-url.service';

export abstract class BaseService {
  protected pathPrefix: string;

  /** Name of the service used as a key to fetch the URL from ConfigUrlService */
  protected serviceKey: ServiceKey;

  protected constructor(protected http: HttpClient, protected configUrlService: ConfigUrlService) {
    this.pathPrefix = '/apis/MESSonceboz/odata/';
    this.serviceKey = 'oven';
  }

  private readonly logResponses = true; //** Set to true if responses to requests should be logged to the console */
  private readonly logRequests = true; //** Set to true if the requests URL and parameters/body should be logged to the console */

  private readonly dataCallback = this.logResponses ? (data : any) => { console.log(data); } : undefined;

  protected getGenericObject<T>(
    urlPart: string,
    params?: Record<string, string>,
    headers?: Record<string, string>,
    otherOptions?: Record<string, any>,
  ): Observable<T> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP get', endpoint, params); }
    return (this.http.get<T>(endpoint, { params, headers, ...otherOptions })).pipe(tap({
      next:  this.dataCallback,
      error: err => { console.error('Error:', err); }
    }),);
  }

  protected getGenericJsonObject<T>(
    urlPart: string,
    params?: Record<string, string>,
    headers?: Record<string, string>,
    otherOptions?: Record<string, any>,
  ): Observable<T> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP get', endpoint, params); }
    return (this.http.get<T>(endpoint, { params, headers, ...otherOptions })).pipe(tap({
      next: data => { JSON.stringify(data);},
      error: err => { console.error('Error:', err); }
    }),);
  }

  protected getGenericObjectWithCustomUrl<T>(
    urlPart: string,
    params?: Record<string, string>,
    headers?: Record<string, string>,
    otherOptions?: Record<string, any>,
  ): Observable<T> {
    const endpoint = urlPart;
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP get', endpoint, params); }
    return (this.http.get<T>(endpoint, { params, headers, ...otherOptions })).pipe(tap({
      next: this.dataCallback,
      error: err => { console.error('Error:', err); }
    }),);
  }

  getFetchGenericObject<TResponse>(urlPart: string,config: RequestInit = {}): Promise<TResponse> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    return fetch(endpoint, config)
      .then((response) => response.json())
      .then((data) => data as TResponse);
  }

  protected postGenericObject<T extends object>(urlPart: string, obj: T): void {
    this.postAndReturnGenericObject<T>(urlPart, obj).subscribe();
  }

  protected postAndReturnGenericObject<T extends object>(urlPart: string, obj: T): Observable<T> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(JSON.stringify(obj));}
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP post', endpoint, obj); }
    
    return this.http.post<T>(endpoint, obj).pipe(tap({
      next: this.dataCallback,
      error: err => { console.error('Error:', err); }
    }));
  }

  protected patchAndReturnGenericObjectWithHeader<T extends object>(urlPart: string, obj: T,headers?: HttpHeaders): Observable<T> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(JSON.stringify(obj));}
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP post', endpoint, obj); }
    return this.http.patch<T>(endpoint, obj, { headers}).pipe(tap({
      next: this.dataCallback,
      error: err => { console.error('Error:', err); }
    }));
  }

  protected postAndReturnGenericObjectWithHeaders<T extends object>(urlPart: string, obj: any, headers?: Record<string, string>):
  Observable<T> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(obj);}
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP post', endpoint, obj); }
    return this.http.post<T>(endpoint, obj, { headers}).pipe(tap({
      next: this.dataCallback,
      error: err => { console.error('Error:', err); }
    }));
  }



  protected putGenericObject<T extends object>(urlPart: string, obj: T): void {
    this.putAndReturnGenericObject<T>(urlPart, obj).subscribe();
  }

  protected putAndReturnGenericObject<T extends object>(urlPart: string, obj: T): Observable<T> {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP put', endpoint, obj); }
    return this.http.put<T>(endpoint, obj).pipe(tap({
      next: this.dataCallback,
      error: err => { console.error('Error:', err); }
    }));
  }

  protected deleteGenericObject(urlPart: string): void {
    const endpoint = this.getApiUrl() + this.pathPrefix + urlPart;
    if (this.logRequests) { console.log(this.serviceKey + ': HTTP delete', endpoint); }
    this.http.delete(endpoint).subscribe({
      error: err => { console.error('Error:', err); }
    });
  }

  protected getApiUrl(): string {
    return this.configUrlService.getURL(this.serviceKey);
  }

}
