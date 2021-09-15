import { ref } from 'vue'

const getGuestsOrders = (id) => {
    const orders = ref({items: []})
    const err = ref(null)
    const params = ref({limit: '100'})
    const uri = ref(new URL('https://tst-api.feeditback.com/exam.guests.orders'))
    if (id) {
        params.value = {...id, limit: '100'}
    }
    Object.keys(params.value).forEach(key => uri.value.searchParams.append(key, params.value[key]))

    const loadOrders = async () => {
        // fetch orders data
        await fetch(uri.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-FIB-API-LANGUAGE': 'en_GB',
                'X-FIB-API-AUTH-TYPE': 'exam',
                'X-FIB-API-AUTH-TOKEN': 'F6HCAFVHPEg3"Sw#'
            }
        })
            .then(response => response.json())
            .then(data => orders.value = data)
            .catch(error => err.value = error.message);
    }

    loadOrders()

    return {
        orders,
        err
    }
}

export default getGuestsOrders
