import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Включает глобальные методы (describe, it, expect)
    globals: true,
    // Среда выполнения
    environment: 'jsdom', 
  },
})
