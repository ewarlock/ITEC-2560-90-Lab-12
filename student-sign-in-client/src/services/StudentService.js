//services is general word for functions or methods that make api calls for server
//make sure my editor doesn't import { response } from 'express' delete that
import axios from 'axios' //editor might also add extra import statements can delete those too

let base_url = '/api/students'

export default {
//maps to routes we made for server
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data //data fetched from server, promise
        })
    },

    addStudent(student) {
        //need info about student - provided by argument
        //axios will handle converting student object to JSON
        return axios.post(base_url, student).then(response => {
            return response.data //like an OK msg
        })
    },

    updateStudent(students) {
        //create url /api/students/1 or the id of the student
        return axios.patch(`${base_url}/${student.id}`, student.then(response => {
            return response.data
        }))
    },

    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}