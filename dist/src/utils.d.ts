import { ConfigurationParameters } from '../openapi/generated';
import { MulticartOAuthConfigurationParameters } from '@cyberline-engineering/cle-oidc-client';
export declare const initializeMulticartApiClient: ({ oauthConfig, clientConfig, }?: {
    oauthConfig?: MulticartOAuthConfigurationParameters | undefined;
    clientConfig?: ConfigurationParameters | undefined;
}) => void;
