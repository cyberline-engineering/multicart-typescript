<script lang="ts" setup>
const props = defineProps<{
    item: { nextPageToken?: string | null; pageSize?: number };
}>();
const emit = defineEmits<{ (e: 'next-page', pageToken: string): void }>();

const nextPage = () => {
    if (props.item?.nextPageToken) {
        emit('next-page', props.item.nextPageToken);
    }
};
</script>

<template>
    <v-btn
        :disabled="!props.item || !props.item.nextPageToken"
        @click="nextPage"
        >Next page</v-btn
    >
</template>
