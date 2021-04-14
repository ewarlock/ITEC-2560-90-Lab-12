<template>
    <tr v-bind:class=" {present: student.present, absent: !student.present} ">
        <td>{{ student.name }}</td>
        <td>{{ student.starID }}</td>
        <td>
            <input type="checkbox" v-bind:checked="student.present" 
            v-on:change="arrivedOrLeft(student, $event.target.checked)">
        </td>
        <td v-show="edit"> <img v-on:click="studentDeleted" src="@/assets/delete.png" class="delete"></td>
    </tr>
</template>

<script>
export default ({
    name: "StudentRow",
    emits: ['student-arrived-or-left', 'delete-student'],
    props: {
        student: Object,
        edit: Boolean
    },
    methods: {
        arrivedOrLeft(student, present) {
            this.$emit("student-arrived-or-left", student, present)
        },
        studentDeleted() {
            if (confirm(`Delete ${this.student.name}?`))
                this.$emit("delete-student", this.student)
        }
    }
})
</script>

<style scoped>
.delete {
    max-width: 25px;
}
.present {
    color: grey;
    font-style: italic;
}
.absent {
    color: black;
    font-weight: bold;
}
</style>