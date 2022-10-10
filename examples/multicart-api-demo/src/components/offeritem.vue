<script lang="ts" setup>
import { OfferGet } from '../../../../dist/multicartshop-client';
const props = defineProps<{ item: OfferGet }>();
</script>

<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col
                    cols="auto"
                    :style="{
                        minWidth: '100px',
                    }"
                >
                    {{ item.id }}
                </v-col>
                <v-col
                    cols="auto"
                    :style="{
                        minWidth: '200px',
                    }"
                >
                    {{ item.name }}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
