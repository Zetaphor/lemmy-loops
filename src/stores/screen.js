// import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useMediaQuery } from '@vueuse/core'

export const useScreenStore = defineStore('screen', () => {
  const isMobile = useMediaQuery('(max-width: 450px)')
  const isTablet = useMediaQuery('(min-width: 451px) and (max-width: 900px)')
  const isLaptop = useMediaQuery('(min-width: 901px) and (max-width: 1250px)')
  const isDesktop = useMediaQuery('(min-width: 1251px)')
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')

  return { isMobile, isTablet, isLaptop, isDesktop, isLargeScreen, isPreferredDark }
})
