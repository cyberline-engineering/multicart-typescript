import {
    DefaultConfig,
    Configuration,
    ConfigurationParameters,
} from '@generated';
import {
    DefaultMulticartOAuthConfig,
    MulticartOAuthClient,
    MulticartOAuthConfiguration,
    MulticartOAuthConfigurationParameters,
} from '@cyberline-engineering/cle-oidc-client';

export const initializeMulticartApiClient = ({
    oauthConfig,
    clientConfig,
}: {
    oauthConfig?: MulticartOAuthConfigurationParameters;
    clientConfig?: ConfigurationParameters;
} = {}) => {
    DefaultMulticartOAuthConfig.config = new MulticartOAuthConfiguration({
        scopes: [...(oauthConfig?.scopes || []), 'multicart.api'],
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
