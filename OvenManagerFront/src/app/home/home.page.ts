import { Component, OnInit, Inject } from '@angular/core';
import { OvenService } from '../services/oven.service';
// import { AuthentificationService } from '../services/authentification.service';
// import { MicrosoftService } from '../services/microsoft.service';

import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { AlertController } from '@ionic/angular';
import { Subject, filter, takeUntil } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { group } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  ovens : any[] = [];
  classifiedOvens : any = {};

  planning : any[] = [];
  jobList : any[] = [];

  filters : any[] = [];
  requests : any[] = [];
  loginModal : any = {
    show : false,
    user : {},
  };

  accessToken : string = '';

  user : any = {
    admin : true,
  };

  blockState: 'loading' | 'blocked' | 'ok' = 'ok';

  private readonly destroyObservablesSubject = new Subject<void>();


  constructor(private service : OvenService, 
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService : MsalService, 
    private msalBroadcastService: MsalBroadcastService,
    private alertController: AlertController,
    private httpClient : HttpClient,
    ) {

      // authService.initialize().subscribe({

      //   next: (result) => {
      //     console.log('initialize');
      //     this.initializeAccountSystem();
      //   },
      //   error: (error) => {
      //     console.error('Erreur lors de l\'initialisation de MSAL:', error);
      //   }
      // });      
    }


  // ngOnInit(){
  //   // console.log(this.service.getAllDatas())
  //   this.service.getAllOvensDatas().subscribe((data : any) => {
  //     console.log(data)
  //     this.ovens = data;

  //     for (let oven of this.ovens){
  //       oven.color =  "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," +  Math.floor(Math.random() * 255) + ")";

  //       for (let prop of oven.property){

  //         oven[prop.name] = {id : prop.id, val : prop.value, name : prop.name};


  //         // oven.property.splice(oven.property.indexOf(prop), 1);
  //       }
  //       // oven.property = undefined;
  //     }

  //     let ovensSBZ : {key : string, develop : boolean, list : any[]}[] = [];
  //     let ovensBCT : {key : string, develop : boolean, list : any[]}[] = [];

  //     //Classify ovens by Site and Entity
  //     for (let oven of this.ovens){

  //       if (oven['site'] && oven['site'].val == 'SONCEBOZ'){
  //         if (!ovensSBZ.find(g => g.key == oven['entity'].val)){
  //           ovensSBZ.push({key : oven['entity'].val, develop : true, list : [oven]});
  //         }
  //         else{
  //           ovensSBZ.find(g => g.key == oven['entity'].val)!.list.push(oven);
  //         }
  //       }
  //       else if (oven['site'] && oven['site'].val == 'BONCOURT'){
  //         if (!ovensBCT.find(g => g.key == oven['entity'].val)){
  //           ovensBCT.push({key : oven['entity'].val, develop : true, list : [oven]});
  //         }
  //         else{
  //           ovensBCT.find(g => g.key == oven['entity'].val)!.list.push(oven);
  //         }
  //       }
  //     }

  //     this.classifiedOvens = {ovensSBZ : ovensSBZ, ovensBCT : ovensBCT};


  //     this.service.getAllPlanningDatas().subscribe((data : any) => {
  //       console.log(data)
  //       this.planning = data;

  //       for (let planning of this.planning){

  //         let copyPlanning = JSON.parse(JSON.stringify(planning));
  //         copyPlanning.jobs = [];
         
  //         for (let job of planning.jobs){

  //           job.user = planning.user;
  //           job.description = planning.description;
  //           job.project = planning.project;
  //           job.startTime = new Date(job.startDate);
  //           job.endTime = new Date(job.startDate);

  //           job.endTime.setHours(job.endTime.getHours() + job.duration);

  //           job.oven = this.ovens.find((oven : any) => { return oven.id == job.idOven})

  //           if (job.validated){
  //             this.jobList.push(job);
  //           }
  //           else{
  //             copyPlanning.jobs.push(job);
  //           }
  //         }

  //         if (copyPlanning.jobs.length > 0){
  //           this.requests.push(copyPlanning);
  //         }
          
          
          
  //       }

  //       console.log(this.jobList)
  //       console.log(this.requests)

  //       // for (let oven of this.ovens){
  //       //   oven.events = this.jobList.filter((job : any) => {
  //       //     return job.idOven == oven.id;
  //       //   })
  //       // }
  //     })
        

  //     // for (let oven of this.ovens){
  //     //   oven.events = this.service.generateRandomDatas().events;
  //     // }
  //   });

  //   // let datas = this.service.generateRandomDatas();

    
  //   // this.planning = datas.events;

  //   // console.log(this.ovens, this.planning)

  //   // this.user = this.authService.getUserInfoFromCookie();

  //   // this.requests = this.service.getRequests();
  // }


  // testMessage(){
  //   console.log('test')
  //   this.microsoftService.sendMessage(
  //     this.accessToken,
  //     'eed94f2e-5789-467d-9969-a8628a47cdad',
  //     '19%3a9a1513a959094a76b10ecbf4483e0309%40thread.tacv2',
  //     'test'
  //   );
  // }

  // https://teams.microsoft.com/l/channel/19%3a9a1513a959094a76b10ecbf4483e0309%40thread.tacv2/XI-Test?groupId=&tenantId=122af547-1901-4078-b3c0-9f19943d851f

  openLoginModal(){
    this.loginModal.show = true;

  }


  public login(): void {
    if (this.blockState === 'ok') {

      console.log('login')
      if (this.msalGuardConfig.authRequest) {

        console.log('loginRedirect')

        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    } else if (this.blockState === 'blocked') {
 
      const networkName = (navigator as any)?.userAgentData?.platform === 'Android' ? 'réseau Wi-Fi' : 'réseau';
 
      this.alertController.create({
        header: 'Attention',
        message: `Le système d'authentification (login.sonceboz.com) n'est pas encore disponible sur ce ${networkName}.`,
        buttons: ['OK'],
      }).then(a => a.present());
    }
  }

  public logout(): void {
    this.authService.logoutRedirect();
  }


  private async initializeAccountSystem(): Promise<void> {

    console.log('initializeAccountSystem')
    // await this.authService.initialize()

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);

        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);

        const userId = payload.account.localAccountId;
        const accessToken = payload.accessToken;
        this.accessToken = accessToken;
        const decodedToken = jwtDecode(accessToken);
        console.log(payload.idToken);
        console.log('TOKEEEEEEEEEEEEEEN', accessToken);
        console.log(decodedToken);
        const email = payload.account.username;
        const userAgent = navigator.userAgent;

        // Appel à Microsoft Graph API pour obtenir les groupes
        this.httpClient.get<GraphApiResponse>('https://graph.microsoft.com/v1.0/me/memberOf', {
          headers: new HttpHeaders({
            // eslint-disable-next-line quote-props, @typescript-eslint/naming-convention
            'Authorization': `Bearer ${accessToken}`
          })
        }).subscribe({
          next: (graphResponse) => {
            console.log('group info')
            console.log(graphResponse);
            const groups = graphResponse.value.map(group => group.displayName).join(', ');
            console.log(groups);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des groupes:', err);
          }
        });
      });


    this.msalBroadcastService.msalSubject$.pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE),
    ).subscribe((result: EventMessage) => {

      console.log(result);


      const payload = result.payload as AuthenticationResult;
      const userId = payload?.account?.localAccountId ?? 'Inconnu';
      const email = payload?.account?.username ?? 'Inconnu';
      const userAgent = navigator.userAgent;
    });


    // setTimeout(() => {
    //   this.authService.instance.handleRedirectPromise();
    // }, 1000);

    this.authService.instance.handleRedirectPromise();
    
    // await  this.authService.initialize();

    // When interaction finished
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroyObservablesSubject)
      )
      .subscribe(() => {
        console.log('inProgress$')
        this.checkAndSetActiveAccount();
      });
  }



  private checkAndSetActiveAccount(): void {
    const activeAccount = this.authService.instance.getActiveAccount();

    console.log(activeAccount)

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);

      const request = {
        scopes: ['user.read'],
        account: accounts[0],
      };

      this.authService.acquireTokenSilent(request).subscribe({
        next: (response) => {

          console.log('checkAndSetActiveAccount')
          const accessToken = response.accessToken;
          this.accessToken = accessToken;
          const decodedToken : any = jwtDecode(accessToken);

          const userId = decodedToken['oid'];
          const role = decodedToken['idtyp'];
          const email = decodedToken['upn'] || decodedToken['unique_name'];
          const userAgent = navigator.userAgent;
          const timestamp = this.getCurrentTimestampInNanoseconds();
        },
        error: (err) => {
          console.error('Erreur lors de l\'acquisition du token:', err);
        }
      });
    }
    else{

      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);

      const request = {
        scopes: ['user.read'],
        account: accounts[0],
      };
      
      this.authService.acquireTokenSilent(request).subscribe({
        next: (response) => {
          console.log('setAccessToken')
          this.accessToken = response.accessToken;
        }
      });
    }
  }


  public getAllAccounts(): AccountInfo[] {
    // console.log('getAllAccounts')
    let accounts = this.authService.instance.getAllAccounts();
    // console.log(accounts)
    // this.accessToken = accounts[0].idToken || '';
    return this.authService.instance.getAllAccounts();
  }


  private getCurrentTimestampInNanoseconds(): string {
    return (Date.now() * 1e6).toString();
  }

}


/* eslint-disable @typescript-eslint/naming-convention */





export interface GraphApiResponse {
  '@odata.context': string;
  value: GraphGroup[];
}

export interface GraphGroup {
  '@odata.type': string;
  id: string;
  deletedDateTime: string;
  classification: string;
  createdDateTime: string;
  creationOptions: string[];
  description?: string;
  displayName: string;
  expirationDateTime: string;
  groupTypes: string[];
  isAssignableToRole: string;
  mail?: string;
  mailEnabled: boolean;
  mailNickname: string;
  membershipRule?: string;
  membershipRuleProcessingState?: string;
  onPremisesDomainName?: string;
  onPremisesLastSyncDateTime?: string;
  onPremisesNetBiosName?: string;
  onPremisesSamAccountName?: string;
  onPremisesSecurityIdentifier?: string;
  onPremisesSyncEnabled?: boolean;
  preferredDataLocation: string;
  preferredLanguage: string;
  proxyAddresses: string[];
  renewedDateTime: string;
  resourceBehaviorOptions: string[];
  resourceProvisioningOptions: string[];
  securityEnabled: boolean;
  securityIdentifier: string;
  theme: string;
  visibility?: string;
  onPremisesProvisioningErrors: string[];
  serviceProvisioningErrors: string[];
}

