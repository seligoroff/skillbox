import eventBus from '@/eventBus';

export default function route(pageName, pageParams) {
    eventBus.$emit('route', pageName, pageParams)
}


