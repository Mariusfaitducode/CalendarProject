import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServerSite, ServiceKey, ServicesUrls } from '../models/common/server';

//ng serve --host mes03-prd-sbz --port 8000 --ssl true -o --ssl-key ./ssl/mes03-prd-sbz.key --ssl-cert ./ssl/mes03-prd-sbz.crt
//--disable-host-check

//ng serve --host 172.23.6.143 --port 4200 --ssl true -o --ssl-key ./ssl/LSWX22140.key --ssl-cert ./ssl/LSWX22140.crt
//--disable-host-check

//ng serve --host 172.23.6.220 --port 4200 --ssl true --disable-host-check
//ionic serve --host 172.23.6.220 --port 4200 --ssl true --disable-host-check
@Injectable({
  providedIn: 'root'
})
export class ConfigUrlService {

  private readonly urls: Record<ServerSite, ServicesUrls> = {
    /* eslint-disable @typescript-eslint/naming-convention */
    ALL: {
      
      oven : 'https://localhost:7120/',
    }
    /* eslint-enable @typescript-eslint/naming-convention */
  };

  private server: ServerSite;

  constructor() {
    this.server = 'ALL';
  }

  public getURL(service: ServiceKey) {
    return this.urls[this.server][service] ?? this.urls.ALL[service];
  }

  public getServer(): ServerSite {
    return this.server;
  };

  public updateUrlConfigServer(server: ServerSite) {
    console.log('Request new api uri', server);
    if (environment.production) {
      this.server = server;
    }
  }
}
