import { shallowMount } from '@vue/test-utils'
import Course from '@/components/Course.vue'

const students = [...Array(30).keys()]
const teacher = { "teacher": "mock"}

describe('Course.vue', () => {
  test('Count teachers on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        teacher: teacher
      }
    })
  
    expect(wrapper.findAll('[data-test="teacher"]')).toHaveLength(1)
  })

  test('Count index on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="index"]')).toHaveLength(30)
  })

  test('Count firstname on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="Firstname"]')).toHaveLength(30)
  })

  test('Count lastname on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="Lastname"]')).toHaveLength(30)
  })

  test('Count email on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="Email"]')).toHaveLength(30)
  })
})
