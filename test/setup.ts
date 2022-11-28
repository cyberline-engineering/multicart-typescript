import { initializeMulticartApiClient } from '../src';
import { MulticartOAuthClient } from '@cyberline-engineering/cle-oidc-client';

import 'cross-fetch/polyfill';
import 'global-agent/bootstrap';

beforeAll(async () => {
    return initializeMulticartApiClient({
        oauthConfig: {
            sandbox: true,
            redirect_uri: 'http://localhost:8899',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scopes: ['openid'],
        },
        clientConfig: {
            basePath: 'http://localhost:5001',
            fetchApi: fetch,
            accessToken: async (_, scopes) => {
                const oauthClient = new MulticartOAuthClient();
                const user = await oauthClient.signinClientCredentials({
                    scopes,
                });
                return `Bearer ${user.access_token}`;
            },
        },
    });
});
