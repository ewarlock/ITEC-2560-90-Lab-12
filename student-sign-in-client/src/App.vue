<template>
<div id="app">

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
      students: [],
      mostRecentStudent: {}
    }
  },
  methods: {
    newStudentAdded(student) {
      this.students.push(student)
      this.students.sort((s1, s2) => {
        return s1.name.toLowerCase() < s2.name.toLowerCase() ? -1 : 1
      })
    },
    studentArrivedOrLeft(student, present) {
      // find student in array, update "present"

      //finds 1st match
      let updateStudent = this.students.find((s) => {
        if (s.name === student.name && s.starID === student.starID)
          return true
      })

      if (updateStudent) {
        updateStudent.present = present
        this.mostRecentStudent = updateStudent
      }
    },
    studentDeleted(student) {
      //using splice, for some reason I couldn't get filter to work?
      //could not see any error messages it just didn't do anything
      let studentIndex = this.students.indexOf(student)
      this.students.splice(studentIndex, 1)

      this.mostRecentStudent = {}
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
</style>
