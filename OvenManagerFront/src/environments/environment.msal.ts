import { MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType, Configuration } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MsalConfig: Configuration = {
  auth: {
    // clientId : '88db990f-f36a-4386-9fc8-b92e71f378c3', //XI-eTuve
    // clientId: '80148904-3d11-48dc-b77e-59fd690ca25a', //Node-redManager
    clientId: 'cf98ea19-ab4c-455a-94a0-d243a7a0851b',  //Mes  

    authority: 'https://login.microsoftonline.com/122af547-1901-4078-b3c0-9f19943d851f',
    redirectUri: '/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE // set to true for IE 11
  }
};

const consentScopes = ['user.read', 'User.ReadBasic.All', 'Tasks.Read','Tasks.Read.Shared','Tasks.ReadWrite','Tasks.ReadWrite.Shared',
'Group.ReadWrite.All','Channel.ReadBasic.All','Group.Read.All','Group.ReadWrite.All','Tasks.Read','Tasks.ReadWrite',
'Channel.ReadBasic.All','Directory.Read.All','Directory.ReadWrite.All','Team.ReadBasic.All',
'TeamSettings.Read.All', 'TeamSettings.ReadWrite.All', 'User.Read.All','User.ReadWrite.All'];
const protectedResourceMap = new Map<string, Array<string>>();
protectedResourceMap.set('https://graph.microsoft.com/v1.0/', consentScopes);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MsalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: !isIE ? InteractionType.Popup : InteractionType.Redirect,
  protectedResourceMap
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MsalGuardConfig: MsalGuardConfiguration = {
  interactionType: !isIE ? InteractionType.Popup : InteractionType.Redirect,
  authRequest: {
    scopes: consentScopes
  },
  loginFailedRoute: '/'
};
