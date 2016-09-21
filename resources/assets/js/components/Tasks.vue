<template>
    <form class="form-group" @submit="createTask">
        <input type="text" class="form-control" v-model="notes">
        <button type="submit" class="btn btn-success btn-block" >Creat Task</button>
    </form>
    <h1>My Tasks ({{counter}})</h1>
    <ul class="list-group">
        <li class="list-group-item" v-for="task in list | orderBy 'id' -1 ">
            {{task.id}} {{task.body}}
            <strong @click="deleteTask(task)" class="right">x</strong>
        </li>
    </ul>
</template>

<script>
    export default{
        data: function () {
            return {
                notes:'',
                list: [],
            };
        },
        computed: {
            counter: function () {
                return this.list.filter(function (task) {
                    return ! task.completed;
                }).length;
            }
        },
        created: function () {
            this.init();
        },
        methods: {
            init: function () {
                this.$http.get('api/tasks').then(
                    (response)=>{
                        //成功回调
                        this.list = response.data;
                     },
                    (response)=>{
                        //失败回调
                        console.log('error', response);
                    });
            },
            createTask:function (e) {
                e.preventDefault();
                this.$http.post('api/tasks', { body : this.notes})
                        .then((response) => {
                        //   this.list.push(response.task);
                            console.log(response);
                    this.init();
                });
            },
            deleteTask: function (task) {
                this.$http.delete('api/tasks/' +  task.id).then((response)=>{
                    if(response.status == 200){
                    this.list.$remove(task);
                }
                 }, (response)=>{
                    console.log('error', response);
                });
            },

            updateCustomer: function() {

//                this.$http.put('api/tasks/' +  task.id, vm.item)
//                        .then((response) => {
//                    vm.getCustomers()
//            })
            }

        }
    }
</script>
