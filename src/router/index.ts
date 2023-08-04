import { createRouter, createWebHistory } from "vue-router";
import main from '@/views/mainView.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: main
        }
    ]
})


export default router