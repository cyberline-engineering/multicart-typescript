<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img :src="logo" class="my-3" contain height="200" />
            </v-col>

            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    Welcome to Multicartshop API Demo
                </h1>

                <h4>Multicartshop typescript SDK</h4>
            </v-col>

            <v-col class="mb-5" cols="12">
                <h2 class="headline font-weight-bold mb-5">What's next?</h2>

                <v-row justify="center">
                    <a
                        v-for="(next, i) in whatsNext"
                        :key="i"
                        :href="next.href"
                        class="subheading mx-3"
                        target="_blank"
                    >
                        {{ next.text }}
                    </a>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Logo
import logo from '../assets/logo.svg';

export default defineComponent({
    name: 'Home',

    data() {
        return {
            logo,
            whatsNext: [
                {
                    text: 'Developer portal',
                    href: 'https://dev.multicartshop.com/',
                },
                {
                    text: 'Multicartshop API usage',
                    href: 'https://dev.multicartshop.com/api-usage/',
                },
                {
                    text: 'Multicartshop OpenAPI Specification',
                    href: 'https://openapi.multicartshop.com/redoc/index.html?url=/openapi/v1/openapi.json',
                },
            ],
        };
    },
});
</script>
