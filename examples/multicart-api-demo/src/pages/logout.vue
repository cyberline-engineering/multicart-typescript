<template></template>

<script lang="ts" setup>
import { MulticartOAuthClient } from '@cyberline-engineering/cle-oidc-client';

const oauthClient = new MulticartOAuthClient();

await oauthClient.signoutCallback();
</script>
