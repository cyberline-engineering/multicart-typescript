<template>
    <v-app>
        <v-navigation-drawer color="grey-darken-2" permanent>
            <v-list>
                <v-list-item
                    v-if="user"
                    :prepend-avatar="user.profile.picture"
                    :prepend-icon="
                        user.profile.picture ? undefined : 'mdi-account-box'
                    "
                    :title="user.profile.name"
                    :subtitle="user.profile.email"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-view-dashboard"
                    title="Dashboard"
                    value="dashboard"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-account-box"
                    title="Account"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-gavel"
                    title="Admin"
                ></v-list-item>
            </v-list>

            <template #append>
                <div class="pa-2">
                    <v-btn v-if="!user" block color="primary" @click="login">
                        Login
                    </v-btn>
                    <v-btn v-else block color="secondary" @click="logout">
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <v-app-bar color="grey-lighten-2"
            ><v-row class="text-center">
                <v-col>
                    <h1 class="display-2 font-weight-bold">
                        Multicartshop API demo dashboard
                    </h1>
                </v-col>
            </v-row></v-app-bar
        >
        <v-main>
            <Suspense>
                <router-view />
            </Suspense>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    initializeMulticartApiClient,
    MulticartOAuthClient,
    User,
} from '../../../dist/multicartshop-client';

initializeMulticartApiClient({
    oauthConfig: {
        sandbox: true,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
    },
    clientConfig: {
        basePath: import.meta.env.VITE_MULTICARTSHOP_API_URI,
    },
});

const oauthClient = new MulticartOAuthClient();
const user = ref<User>();

// oauthClient.events.addUserLoaded((u) => {
//     user.value = u;
// });

const login = async () => {
    user.value = await oauthClient.signinPopup();
};

const logout = async () => {
    await oauthClient.signoutPopup();
};
</script>
