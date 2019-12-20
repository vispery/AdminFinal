<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAllUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" label="序号" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="100" sortable>
			</el-table-column>
			<el-table-column prop="role" label="管理员权限" width="100" sortable>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="id" label="系统编号" min-width="180" sortable>
			</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	import { spotlight } from "@/graphql/search";
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				currentPage: 0,
	  			keyword: "",
			    perPage:100,
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					this.users = res.data.users;
					this.loading = false;
					//NProgress.done();
				});
			},
			async getAllUsers(){
				const usersResponse = await spotlight(
            	this.filters.name,
				this.currentPage,
				this.perPage,
		  );
		  this.users = usersResponse.data.Users.users;
         // this.nPagesOfResults = papersResponse.numOfPages;
			}
		},
		mounted() {
			//this.getUser();
			this.getAllUsers();
		}
	};

</script>

<style scoped>

</style>