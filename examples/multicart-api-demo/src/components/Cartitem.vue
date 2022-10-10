<script lang="ts" setup>
import { CartItemGet } from '../../../../dist/multicartshop-client';
const props = defineProps<{ item: CartItemGet }>();
</script>

<template>
    <v-row>
        <v-col>
            <v-img :src="item.smallImageUrl || ''" :alt="item.name"></v-img>
        </v-col>
        <v-col>
            {{ item.name }}
        </v-col>
        <v-col>
            <div v-html="item.description"></div>
        </v-col>
    </v-row>
</template>
