import { describe, expect, test } from '@jest/globals';
import { AdminCartItemApi } from '../src';

describe('cart item API client', () => {
    test('get cart item text', async () => {
        const id = '00bac85e-9388-4862-a6e4-e4e36479f6dd';
        const client = new AdminCartItemApi();
        const cartItem = await client.cartItemGet2({ id });

        expect(cartItem).toBeDefined();
        expect(cartItem.id).toBe(id);
    });
});
