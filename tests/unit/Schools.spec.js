import { shallowMount } from '@vue/test-utils'
import Schools from '@/components/Schools.vue'

describe('Course.vue', () => {
  test('Count teachers on a Course', () => {
    const wrapper = shallowMount(Schools)
  
    expect(wrapper.findAll('[data-test="course"]')).toHaveLength(11)
  })
})
