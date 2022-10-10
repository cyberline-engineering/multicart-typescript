<script lang="ts" setup>
import {
    OfferApi,
    OfferGet,
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

const offerLoad = async (offer: OfferGet) => {
    if (!offer?.id) return;

    const o = await client.offerGet({ id: offer.id });

    Object.assign(offer, o);
};

const offerExpand = async (offer: OfferGet, expanded: Boolean) => {
    if (!expanded || !!offer.cartItems) return;

    await offerLoad(offer);
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
            v-for="offer in data.data"
            :item="offer"
            class="my-4"
            @expand="(e) => offerExpand(offer, e)"
        ></offeritem>
    </v-container>
</template>
