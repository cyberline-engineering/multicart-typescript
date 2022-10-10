<script lang="ts" setup>
import {
    CartItemApi,
    CartItemPagingResponse,
} from '../../../../dist/multicartshop-client';
import CartItem from '@/components/Cartitem.vue';

const client = new CartItemApi();
const data = await client.cartItemList().catch((e) => {
    console.error(e);
    return {} as CartItemPagingResponse;
});
</script>

<template>
    <h1>Products API demo</h1>
    <cart-item v-for="product in data.data" :item="product"></cart-item>
</template>
