import { initializeMulticartApiClient } from '../src';
import { MulticartOAuthClient } from '@cyberline-engineering/cle-oidc-client';
import { debuggerIsAttached } from 'debugger-is-attached';

import 'cross-fetch/polyfill';
import 'global-agent/bootstrap';

beforeAll(async () => {
    await setJestTimeout();

    return initializeMulticartApiClient({
        oauthConfig: {
            sandbox: true,
            redirect_uri: 'http://localhost:8899',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
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

beforeEach(async () => {
    await setJestTimeout();
});

async function setJestTimeout() {
    const debugging = await debuggerIsAttached();
    const timeout = debugging ? 300000 : 10000;
    jest.setTimeout(timeout);
}
