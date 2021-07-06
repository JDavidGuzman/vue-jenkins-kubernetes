import { shallowMount } from '@vue/test-utils'
import Course from '@/components/Course.vue'

const students = [[{'longValue': 1},{'stringValue': 'mock'},{'stringValue': 'mock'},{'stringValue': 'mock'}],
                  [{'longValue': 2},{'stringValue': 'mock'},{'stringValue': 'mock'},{'stringValue': 'mock'}]]
const teacher = [{'longValue': 1},{'stringValue': 'mock'},{'stringValue': 'mock'},{'stringValue': 'mock'}]

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
  
    expect(wrapper.findAll('[data-test="index"]')).toHaveLength(2)
  })

  test('Count firstname on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="Firstname"]')).toHaveLength(2)
  })

  test('Count lastname on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="Lastname"]')).toHaveLength(2)
  })

  test('Count email on a Course', () => {
    const wrapper = shallowMount(Course, {
      propsData: { 
        students: students
       }
    })
  
    expect(wrapper.findAll('[data-test="Email"]')).toHaveLength(2)
  })
})
