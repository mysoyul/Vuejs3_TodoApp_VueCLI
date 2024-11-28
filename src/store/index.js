import { createStore, createLogger } from "vuex"

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const storageKey = localStorage.key(i)
                if (storageKey !== '__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__') {
                    const itemJson = localStorage.getItem(storageKey)
                    arr.push(JSON.parse(itemJson))
                }
            }
        }
        return arr;
    }
}

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    state: {
        todoItems: storage.fetch()
    },
})
