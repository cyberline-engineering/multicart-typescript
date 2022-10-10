<script lang="ts" setup>
import { CartItemGet } from '../../../../dist/multicartshop-client';
const props = defineProps<{ item: CartItemGet }>();
</script>

<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="auto">
                    <v-img
                        height="100"
                        width="100"
                        :src="
                            item.smallImageUrl ||
                            (item.imagesUrls && item.imagesUrls[0]) ||
                            ''
                        "
                        :alt="item.name"
                    ></v-img>
                </v-col>
                <v-col
                    cols="auto"
                    :style="{
                        minWidth: '200px',
                    }"
                >
                    {{ item.name }}
                </v-col>
                <v-col>
                    <div v-html="item.description"></div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
