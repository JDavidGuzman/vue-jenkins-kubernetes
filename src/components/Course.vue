<template>
    <table v-if="grades" class="grades">
        <tr>
            <th class="course grades-header"><h1>{{ selected_student[1]['stringValue'] }} {{ selected_student[2]['stringValue'] }}</h1><p>email: {{ selected_student[3]['stringValue'] }}</p></th>
        </tr>
        <tr v-for="(subject, index) in subjects" :key="subject.id">
            <td class="grades-square">{{ subject }}</td>
            <td class="grades-square"> {{ grades[index]['stringValue'] }} </td>
        </tr>
        <tr>
            <td class="grades-button">
                <button @click="back()" class="grades-button-action">BACK</button>
            </td>
        </tr>
    </table>
    <table v-if="!grades">
        <tr v-if="teacher">
            <th class="course">Course {{ course }} -- {{ school_name }}</th>
        </tr>
        <div v-if="teacher">
            <tr>
                <th class="header">Code</th>
                <th class="header">Firstname</th>
                <th class="header">Lastname</th>
                <th class="header">Email</th>
            </tr>
        </div>
        <div v-if="teacher">
            <tr>
                <td class="square" data-test="teacher">Teacher</td>
                <td class="square">{{ teacher[1]['stringValue'] }}</td>
                <td class="square">{{ teacher[2]['stringValue'] }}</td>
                <td class="square">{{ teacher[3]['stringValue'] }}</td>
            </tr>
        </div>
        <div v-if="students">
            <tr v-for="(student, index) in students" :key="student.id" @click="getGrades(student[0]['longValue'], index)">
                <td class="square" data-test="index">{{ index + 1 }}</td>
                <td class="square" data-test="Firstname">{{ student[1]['stringValue'] }}</td>
                <td class="square" data-test="Lastname">{{ student[2]['stringValue'] }}</td>
                <td class="square" data-test="Email">{{ student[3]['stringValue'] }}</td>
            </tr>
        </div>
    </table>
</template> 
<script>  
  export default {
    name: 'Course',
    props: {
        teacher: Object,
        students: Array,
        course: String,
        school_name: String
    },
    data() {
        return {
            grades:null,
            selected_student:null,
            subjects: ['Math','Biology', 'Chemistry', 'Physics', 'Languages', 'Arts', 'Sports', 'Politics']
        }
    },
    methods: {
        async getGrades(student_id, index) {
            this.selected_student = this.students[index]
            const res = await fetch(`${process.env.VUE_APP_API_URL}/get_grades/${student_id}`)
            const data = await res.json()
            this.grades = data['grades'][0]
        },
        back() {
            this.grades = null
        } 
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Lato');
table {
    margin-top: 6%;
    margin-left: 20%;
    width: 80%;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  width: 100%;
}
tr {
    display: block;
    background-color: white;
}
tr:hover .square{
    color: white;
    background-color: black;
    cursor: pointer;
}
.course {
    text-align: center;
    font-size: 200%;
    font-family: 'Lato', serif;
    color: black;
    background-color: rgb(110, 128, 99);
    display: block;
}
.header {
    display: block;
    width: 25%;
    float: left;
    background-color: rgb(110, 128, 99);
}
.square {
    display: block;
    width: 25%;
    float: left;
    background-color: ivory;
}
.grades {
    width: 30%;
    display: block;
    margin-left: 40%;
}
.grades-header {
    font-size: 125%;
}
.grades-square {
    display: inline-block;
    width: 50%;
    padding: 5%;
}
.grades-button {
    display: block;
    width: 100%;
}
.grades-button-action {
    display: block;
    width: 100%;
    font-size: 200%;
    cursor: pointer;
    outline: black double;
} 
.grades-button-action:hover {
    background-color: #a0b4c5;
}
</style>