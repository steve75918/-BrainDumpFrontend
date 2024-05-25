import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue';
import CalcTT2RaidTarget from '@/components/CalcTT2RaidTarget.vue';
import UploadTT2RaidReport from '@/components/UploadTT2RaidReport.vue';

const routes = [
    {
        path     : '/',
        name     : 'Home',
        component: HelloWorld
    },
    {
        path     : '/tt2/titan',
        name     : 'TT2Titan',
        component: CalcTT2RaidTarget
    },
    {
        path     : '/tt2/upload',
        name     : 'TT2Upload',
        component: UploadTT2RaidReport
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
