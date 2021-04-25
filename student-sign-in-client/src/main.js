import { createApp } from 'vue'
import App from './App.vue'
//adding these
import StudentService from '@/services/StudentService' //.js is implied

let app = createApp(App)

//puts StudentService.js into... the app's config somewhere
app.config.globalProperties.$student_api = StudentService

app.mount('#app')
