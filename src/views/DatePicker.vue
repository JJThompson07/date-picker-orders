<template>
  <div class="page page--date">
    <div class="date-pickers__types">
      <div class="btn date-pickers--range" @click="isRange = true, date = null">Range</div>
      <div class="btn date-pickers--date" @click="isRange = false, range = null">Date</div>
    </div>
    <div class="date-pickers">
      <div class="date-pickers__range date-pickers__item">
        <v-date-picker
            v-if="!isRange && min"
            v-model="date"
            color="purple"
            :min-date="min"
            :max-date="max"
        />
        <v-date-picker
            v-if="isRange && min"
            v-model="range"
            color="green"
            is-range
            :min-date="min"
            :max-date="max"
        />
        <div>
        </div>
      </div>
    </div>
    <div v-if="selectedRange && filteredGuests">
      <div class="guests">
        <div v-for="guest in filteredGuests" class="guest">
          <div class="guest__details">
            <div class="guest__visited">{{ formatDate(guest.visited) }}</div>
            <div class="guest__name">
              {{ guest.first_name }} {{ guest.last_name }}
              <span class="material-icons" :class="'icon--' + guest.gender.toLowerCase()">{{ guest.gender.toLowerCase()
                }}</span>
            </div>
            <div class="guest__contact">
              <span class="material-icons small">mail_outline</span>
              {{ guest.email }}
            </div>
          </div>
          <div class="guest__orders" v-if="guest.orders.value.items.length > 0">
            <div class="order__details--title">
              Order Details
            </div>
            <SingleOrder v-for="order in guest.orders.value.items" :key="order.id" :order="order" class="guest__order"/>
          </div>
          <Loader v-else />
        </div>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import getGuests from '../composables/getGuests'
import getGuestsOrders from '../composables/getGuestsOrders'
import { format, startOfDay, endOfDay, formatISO9075  } from 'date-fns'
import { ref, watchEffect, computed } from 'vue'
import SingleOrder from '../components/SingleOrder'
import Loader from '../components/Loader'

export default {
  name: 'DatePicker',
  components: { Loader, SingleOrder },
  setup() {
    const isRange = ref(true)
    const date = ref(null)
    const range = ref(null)
    const selectedRange = ref(null)
    const { guests, error } = getGuests(selectedRange.value)
    const request = ref(null)

    const dates = computed(() => {
      const items = ref([])
      const datesSet = new Set()

      guests.value.items.forEach(guest => {
        datesSet.add(guest.visited)
      })

      items.value = [...datesSet]
      items.value = items.value.sort((a,b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
      })

      return items.value
    })

    const min = computed(() => {
      return dates.value[0]
    })
    const max = computed(() => {
      return dates.value[dates.value.length - 1]
    })

    const formatDate = (date) => {
      return format(new Date(date), 'do LLL yyyy')
    }

    const formatStart = (date) => {
      return formatISO9075(startOfDay(date))
    }

    const formatEnd = (date) => {
      return formatISO9075(endOfDay(date))
    }


    watchEffect(() => {
      selectedRange.value = null
      if (date.value) {
        selectedRange.value = {since: formatStart(date.value), until: formatEnd(date.value)}
      }
      if (range.value) {
        selectedRange.value = {since: formatStart(range.value.start), until: formatEnd(range.value.end)}
      }
      request.value = getGuests(selectedRange.value)
      })

    // get guests list from date range
    const filteredGuests = computed( () => {
      let guests = []
      request.value.guests.items.forEach((guest) => {
        let { orders, err } = getGuestsOrders({guest_id: guest.id})
        guests.push({...guest, orders: orders})
      })
      return guests
    })


    return {
      error,
      isRange,
      date,
      range,
      selectedRange,
      filteredGuests,
      dates,
      min,
      max,
      formatDate
    }
  }
}
</script>

<style lang="scss">
.date-pickers {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;

  &__title {
    text-align: center;
  }
  &__range {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  &__types {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

.guests {
  display: flex;
  flex-flow: column;
  gap: 1rem;

  .guest {
    background-color: whitesmoke;
    padding: 1rem;
    border-radius: 1rem;
    overflow: hidden;

    &__details {
      background: white;
      padding: 1rem;
      border-radius: 0.5rem 0.5rem 0 0;
    }

    &__name {
      font-size: 1.2rem;
    }

    &__name,
    &__contact {
      display: flex;
      align-items: center;
      gap: 0.5rem
    }

    &__contact {
      color: var(--muted)
    }

    &__orders {
      display: flex;
      flex-flow: column;
      gap: 0.4rem;
    }
  }
}
</style>
