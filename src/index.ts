import {
    DefaultConfig,
    Configuration,
    ConfigurationParameters,
} from '../openapi/generated';
import {
    DefaultMulticartOAuthConfig,
    MulticartOAuthClient,
    MulticartOAuthConfiguration,
    MulticartOAuthConfigurationParameters,
} from './cle-oidc-client';

export * from '../openapi/generated';

export const initializeMulticartApiClient = ({
    oauthConfig,
    clientConfig,
}: {
    oauthConfig?: MulticartOAuthConfigurationParameters;
    clientConfig?: ConfigurationParameters;
} = {}) => {
    DefaultMulticartOAuthConfig.config = new MulticartOAuthConfiguration({
        scope: oauthConfig?.scope || 'multicart.api',
        ...oauthConfig,
    });

    if (!clientConfig?.accessToken) {
        const oauthClient = new MulticartOAuthClient();
        const getAccessToken = async () => {
            const user =
                (await oauthClient.signinSilent()) ||
                (await oauthClient.signinPopup());

            return user?.access_token || '';
        };

        if (clientConfig) {
            clientConfig.accessToken = getAccessToken;
        } else {
            clientConfig = { accessToken: getAccessToken };
        }
    }

    DefaultConfig.config = new Configuration(clientConfig);
};
