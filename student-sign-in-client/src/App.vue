<template>
<div id="app">

  <h1>Student Sign In</h1>

  <new-student-form v-on:student-added="newStudentAdded"></new-student-form>

  <student-table v-bind:students="students" 
    v-on:student-arrived-or-left="studentArrivedOrLeft"
    v-on:delete-student="studentDeleted"></student-table>

  <!--v-bind:prop:data-->
  <student-message v-bind:student="mostRecentStudent"></student-message>

</div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      //no example data needed
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    //load all students - make API request
    //mounted runs as app loads
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      //can call methods in StudentService.js
      this.$student_api.getAllStudents().then(students => {
        //returns promise with array of students
        this.students = students
      }).catch(() => {
        alert('Unable to fetch student list')
      })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then(() => {
        this.updateStudents() //updates students with new list of students from server after adding
      }).catch(err => {
        let msg = err.response.data.join('\n')
        alert('Error adding student\n' + msg)
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present //update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch(() => {
        alert('Unable to update student')
      })
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} //clear welcome/goodbye message just in case
      }).catch(() => {
        alert('Unable to delete student')
      })
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
h1 {
  padding: 20px;
}
</style>
