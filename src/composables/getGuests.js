import { ref } from 'vue'

const getGuests = (range) => {
    const guests = ref({items: []})
    const error = ref(null)
    const params = ref({ limit: '10' })
    const uri = ref(new URL('https://tst-api.feeditback.com/exam.guests'))
    if (range) {
        if (!range.limit) {
            params.value = {...range, limit: '10'}
        } else {
            params.value = {...range}
        }
    }
    Object.keys(params.value).forEach(key => uri.value.searchParams.append(key, params.value[key]))

    const loadGuests = async () => {
        // fetch guests data
        await fetch(uri.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-FIB-API-LANGUAGE': 'en_GB',
                'X-FIB-API-AUTH-TYPE': 'exam',
                'X-FIB-API-AUTH-TOKEN': 'F6HCAFVHPEg3"Sw#'
            },
        })
            .then(response => response.json())
            .then(data => guests.value = data)
            .catch(err => error.value = err.message);
    }

    loadGuests()

    return {
        guests,
        error
    }

}

export default getGuests
