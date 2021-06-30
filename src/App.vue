<template>
  <Schools @select-school="selectSchool($event)" @select-course="selectCourse($event)" :schools="schools"/>
  <Course :course="course" :teacher="teacher" :students="students" :school_name="school_name"/>
</template>

<script>
import Schools from './components/Schools.vue'
import Course from './components/Course.vue'

export default {
  name: 'App',
  components: {
    Schools,
    Course
  },
  data() {
    return {
      schools:null,
      school_id:null,
      school_name:null,
      course:null,
      teacher:null,
      students:null
    }
  },
  mounted() {
    this.getSchools();
  },
  methods: {
    async getSchools() {
    const res = await fetch(`${process.env.VUE_APP_API_URL}/get_schools`)
    const data = await res.json()
    this.schools = data['schools']
    },
    selectSchool(school) {
      this.school_id = school.School_ID
      this.school_name = school.Name
    },
    async selectCourse(course) {
      this.course = await course
      const res = await fetch(`${process.env.VUE_APP_API_URL}/get_course/${this.school_id}/${this.course}`)
      const data = await res.json()
      this.teacher = await data['teacher'][0]
      this.students = await data['students']
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
