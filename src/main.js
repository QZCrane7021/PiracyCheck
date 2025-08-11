import './assets/main.css'
import { createApp } from 'vue'
import { definePreset } from '@primeuix/themes'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'



const app = createApp(App)

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{neutral.50}',
            100: '{neutral.100}',
            200: '{neutral.200}',
            300: '{neutral.300}',
            400: '{neutral.400}',
            500: '{neutral.500}',
            600: '{neutral.600}',
            700: '{neutral.700}',
            800: '{neutral.800}',
            900: '{neutral.900}',
            950: '{neutral.950}'
        }
    }
})

app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
})

app.component('InputText',InputText)
app.component('SelectButton',SelectButton)
app.component('Card',Card)

app.mount('#app')
