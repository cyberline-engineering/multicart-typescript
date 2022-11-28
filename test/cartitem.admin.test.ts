/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from '@jest/globals';
import { AdminCartItemApi } from '../src';

describe('cart item API client', () => {
    test('get cart item text', async () => {
        const id = '39508665-8443-45bb-938b-65344bfd380a';
        const client = new AdminCartItemApi();
        const cartItem = await client.adminCartItemGet({ id });

        expect(cartItem).toBeDefined();
        expect(cartItem.id).toBe(id);
    }, 30000);
});
