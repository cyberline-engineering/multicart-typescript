<script lang="ts" setup>
import {
    CartItemApi,
    CartItemListRequest,
    CartItemPagingResponse,
} from '../../../../dist/multicartshop-client';
import cartitem from '@/components/cartitem.vue';
import Paging from '@/components/paging.vue';
import { ref } from 'vue';

const client = new CartItemApi();
const data = ref<CartItemPagingResponse>({});

const loadData = async (request?: CartItemListRequest) => {
    data.value = await client.cartItemList(request).catch((e) => {
        console.error(e);
        return {};
    });
};

await loadData();
</script>

<template>
    <v-container class="bg-grey-lighten-4">
        <h1>Products API demo</h1>
        <paging
            :item="{ ...data }"
            @next-page="(e) => loadData({ pageToken: e })"
        ></paging>
        <cartitem
            v-for="product in data.data"
            :item="product"
            class="my-4"
        ></cartitem>
    </v-container>
</template>
