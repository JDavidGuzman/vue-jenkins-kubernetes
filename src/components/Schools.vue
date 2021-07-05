<template>
  <div class="menu">
    <div class="label">Schools</div>
    <div class="spacer"></div>
    <div v-for="course in courses" :key="course.id"  class="courses">
      <div @click="$emit('select-course', course)">
        <span data-test="course">{{ course }}</span>
      </div>
    </div>
    <div v-for="school in schools" :key="school.id">
      <div @click="$emit('select-school', school)" class="item">
        <span>{{ school[1]['stringValue'] }}</span>
      </div>
    </div>
  </div>
</template>
  
<script>  
  export default {
    name: 'Schools',
    props: {
        schools: Array
    },
    emits: ['select-school', 'select-course'],
    data() {
      return {
        courses: ['1st','2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th']
      }
    }
  }
</script>
  
<style>
@import url('https://fonts.googleapis.com/css?family=Lato');
body {
  background-color: #a0b4c5;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Lato', sans-serif;
  margin: 20px;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.menu {
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  cursor: pointer;
  pointer-events: none;
  position: absolute;
  bottom: 20px;
  left: 20px;
  top: 20px;
  text-align: left;
}
.menu:hover {
  pointer-events: all;
}
.label {
  display: inline-block;
  cursor: pointer;
  pointer-events: all;
  font-size: 200%;
}
.spacer {
  display: inline-block;
  width: 180px;
  margin-left: 15px;
  margin-right: 15px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
}
.spacer:before {
  content: "";
  position: absolute;
  border-bottom: 1px solid #ffffff;
  height: 1px;
  width: 0%;
  transition: width 0.25s ease;
  transition-delay: 0.7s;
}
.courses {
  position: relative;
  display: inline-block;
  margin-top: 20px;
  margin-right: 30px;
  margin-left: 25px;
  top: 10px;
  opacity: 0;
  transition: opacity 0.5s ease, top 0.5s ease;
  transition-delay: 0;
}
.menu:hover .courses {
  opacity: 1;
  top: 0px;
}
.courses:before {
  position: absolute;
  transition: width 0.25s ease;
  transition-delay: 0.7s;
}
.item {
  position: relative;
  display: inline-block;
  margin-top: 20px;
  margin-right: 30px;
  margin-left: 25px;
  top: 10px;
  opacity: 0;
  transition: opacity 0.5s ease, top 0.5s ease;
  transition-delay: 0;
}
span {
  transition: color 0.5s ease;
}
.item:hover span {
  color: #131212;
}
.item:focus-within span{
  color: #131212;
}
.courses:hover span {
  color: #131212;
}
.menu:hover .spacer:before {
  width: 100%;
  transition-delay: 0s;
}
.menu:hover .item {
  opacity: 1;
  top: 0px;
}
.item:nth-child(1) {
  transition-delay: 0.45s;
}
.item:nth-child(2) {
  transition-delay: 0.4s;
}
.item:nth-child(3) {
  transition-delay: 0.35s;
}
.item:nth-child(4) {
  transition-delay: 0.3s;
}
.item:nth-child(5) {
  transition-delay: 0.25s;
}
.item:nth-child(6) {
  transition-delay: 0.2s;
}
.item:nth-child(7) {
  transition-delay: 0.15s;
}
.item:nth-child(8) {
  transition-delay: 0.1s;
}
.item:nth-child(9) {
  transition-delay: 0.05s;
}
.item:nth-child(10) {
  transition-delay: 0s;
}
.menu:hover .item:nth-child(1) {
  transition-delay: 0.25s;
}
.menu:hover .item:nth-child(2) {
  transition-delay: 0.3s;
}
.menu:hover .item:nth-child(3) {
  transition-delay: 0.35s;
}
.menu:hover .item:nth-child(4) {
  transition-delay: 0.4s;
}
.menu:hover .item:nth-child(5) {
  transition-delay: 0.45s;
}
.menu:hover .item:nth-child(6) {
  transition-delay: 0.5s;
}
.menu:hover .item:nth-child(7) {
  transition-delay: 0.55s;
}
.menu:hover .item:nth-child(8) {
  transition-delay: 0.6s;
}
.menu:hover .item:nth-child(9) {
  transition-delay: 0.65s;
}
.menu:hover .item:nth-child(10) {
  transition-delay: 0.7s;
}
</style>