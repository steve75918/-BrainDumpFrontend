import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue';
import CalcTT2RaidTarget from '@/components/CalcTT2RaidTarget.vue';
import UploadTT2RaidReport from '@/components/UploadTT2RaidReport.vue';
import ShowTT2RaidAttendance from '@/components/ShowTT2RaidAttendance.vue';


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
    },
    {
        path     : '/tt2/attendance',
        name     : 'TT2Attendance',
        component: ShowTT2RaidAttendance
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
