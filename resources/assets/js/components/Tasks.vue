<template>
    <form class="form-group" @submit="createTask">
        <input type="text" class="form-control" v-model="notes">
        <button type="submit" class="btn btn-success btn-block" >Creat Task</button>
    </form>
    <h1>My Tasks ({{counter}})</h1>
    <ul class="list-group">
        <li class="list-group-item" v-for="task in list | orderBy 'id' -1 ">
            <!--<input type="checkbox" @click="updateTask(task)">-->
                <input type="checkbox"  @click="updateTask(task)" v-if="!task.completed">
            <span v-if="!task.completed">{{task.created_at.substring(5)}}   任务:{{task.body}}</span>
            <del v-else>{{task.created_at.substring(5)}}   任务:{{task.body}}</del>
            <button @click="deleteTask(task)"  type="button" class="close pull-right"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        </li>
    </ul>
</template>

<!--<del>被删除</del>-->
<!--<span style="text-decoration:line-through;">删除线效果</span>-->

<script>
    console.log()
    export default{
        props: ['cur'],
        data: function () {
            return {
                notes:'',
                list: [],
                number:1,
                all:20,
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
            console.log('hahhaha');
            console.log(this.all);
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
            updateTask: function (task) {
                console.log(task);
                this.$http.put('api/tasks/' +  task.id, {completed:1})
                    .then((response) => {
                        this.init();
                     })
            },
        }
    }
</script>
