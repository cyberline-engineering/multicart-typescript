<template>
    <Suspense>
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
                        to="/"
                    ></v-list-item>
                    <v-list-item
                        prepend-icon="mdi-text-box"
                        title="Products"
                        to="products"
                    ></v-list-item>
                    <v-list-item
                        prepend-icon="mdi-folder"
                        title="Offers"
                        to="offers"
                    ></v-list-item>
                </v-list>

                <template #append>
                    <div class="pa-2">
                        <v-btn
                            v-if="!user"
                            block
                            color="primary"
                            @click="login"
                        >
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
                <router-view />
            </v-main>
        </v-app>
    </Suspense>
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
        //set $BASE_PATH to MULTICART_AUTH_SANDBOX_PATH
        sandbox: true,

        //default: ${window.location.origin}/login
        //redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        //default: ${window.location.origin}/logout
        //logout_redirect_uri: import.meta.env.VITE_LOGOUT_REDIRECT_URI,

        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
    },
    clientConfig: {
        basePath: import.meta.env.VITE_MULTICARTSHOP_API_URI,
    },
});

const oauthClient = new MulticartOAuthClient();
const user = ref<User>();

oauthClient.getUser().then((u) => (user.value = u || undefined));

const login = async () => {
    user.value = await oauthClient.signinPopup();
};

const logout = async () => {
    await oauthClient.signoutPopup();
    user.value = undefined;
};
</script>
