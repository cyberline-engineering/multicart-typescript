import { createWebHistory, createRouter } from 'vue-router';
import routes from '~pages';

const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory(),
    routes,
});

export default router;
