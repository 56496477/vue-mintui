import List from './page/list'

export default function(router) {
    router.map({
        '*': {
            component: List
        }
    })
}