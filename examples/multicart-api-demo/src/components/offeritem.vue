<script lang="ts" setup>
import { OfferGet } from '../../../../dist/multicartshop-client';
import Cartitem from '@/components/cartitem.vue';
import { ref } from 'vue';
const props = defineProps<{ item: OfferGet }>();
const expanded = ref(false);
const emit = defineEmits<{ (e: 'expand', expanded: boolean): void }>();
const expandHandler = () => {
    expanded.value = !expanded.value;
    emit('expand', expanded.value);
};
</script>

<template>
    <v-card @click="expandHandler">
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
            <v-row v-if="expanded">
                <v-col>
                    <cartitem
                        v-for="cartitem in item.cartItems"
                        :item="cartitem"
                    ></cartitem>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
