import {
    DefaultConfig,
    Configuration,
    ConfigurationParameters,
} from './openapi/generated';
import {
    DefaultMulticartOAuthConfig,
    mergeScopes,
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
    DefaultMulticartOAuthConfig.config = new MulticartOAuthConfiguration(
        Object.assign(
            {
                ...oauthConfig,
            },
            { scopes: mergeScopes(oauthConfig?.scopes, ['multicart.api']) }
        )
    );

    if (!clientConfig?.accessToken) {
        const oauthClient = new MulticartOAuthClient();
        const getAccessToken = async () => {
            const user =
                (await oauthClient.signinSilent()) ||
                (await oauthClient.signinPopup());

            return user ? `Bearer ${user?.access_token}` : '';
        };

        if (clientConfig) {
            clientConfig.accessToken = getAccessToken;
        } else {
            clientConfig = { accessToken: getAccessToken };
        }
    }

    DefaultConfig.config = new Configuration(clientConfig);
};
