<script lang="ts" setup>
import {
    OfferApi,
    OfferListRequest,
    OfferPagingResponse,
} from '../../../../dist/multicartshop-client';
import offeritem from '@/components/offeritem.vue';
import Paging from '@/components/paging.vue';
import { ref } from 'vue';

const client = new OfferApi();
const data = ref<OfferPagingResponse>({});

const loadData = async (request?: OfferListRequest) => {
    data.value = await client.offerList(request).catch((e) => {
        console.error(e);
        return {};
    });
};

await loadData();
</script>

<template>
    <v-container class="bg-grey-lighten-4">
        <h1>Offers API demo</h1>
        <paging
            :item="{ ...data }"
            @next-page="(e) => loadData({ pageToken: e })"
        ></paging>
        <offeritem
            v-for="product in data.data"
            :item="product"
            class="my-4"
        ></offeritem>
    </v-container>
</template>
