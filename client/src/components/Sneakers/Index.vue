<template>
	<div class="container">
		<br>
		<h2>ดู Sneaker ทั้งหมด</h2>
		<h4>จํานวน sneaker : {{ sneakers.length }}</h4>
		<p><button v-on:click="navigateTo('/sneaker/create')">สร้าง sneaker</button></p>
		<div v-for="sneaker in sneakers" v-bind:key="sneaker.id">
			<table>
				<tr>
					<td style="width:300px">
					<div class="thumbnail-pic" v-if="sneaker.thumbnail != 'null'">
						<img :src="BASE_URL+sneaker.thumbnail" alt="thumbnail">
					</div>
				</td>
				<td style="width:500px">
					<p>Name: {{ sneaker.name }}</p>
					<p>Brand: {{ sneaker.brand }}</p>
					<p>Price: {{ sneaker.price }} $</p>
					<p>Status: {{ sneaker.status }}</p>
				</td>
				<td style="width:500px">
					<button v-on:click="navigateTo('/sneaker/' + sneaker.id)">ดู Sneaker</button><br><br>
					<button v-on:click="navigateTo('/sneaker/edit/' + sneaker.id)">แก้ไข Sneaker</button><br><br>
					<button v-on:click="deleteSneaker(sneaker)">ลบข้อมูล</button><br>
				</td>
				</tr>
		</table>
		</div>
			<hr />
		</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import SneakerService from '@/services/SneakerService'
import _ from 'lodash'
import ScrollMonitor from 'scrollMonitor'
import Sneaker from '../../../../server/src/models/Sneaker'
let LOAD_NUM = 3
let pageWatcher
export default {
	watch: {
		search: _.debounce(async function (value) {
			const route = {
				name: 'sneakers'
			}
			if (this.search !== '') {
				route.query = {
					search: this.search
				}
			}
			console.log('search: ' + this.search)
			this.$router.push(route)
		}, 700),
		'$route.query.search': {
			immediate: true,
			async handler(value) {
				this.sneakers = []
				this.results = []
				this.loading = true
				this.results = (await SneakerService.index(value)).data
				this.appendResults()
				this.results.forEach(sneaker => {
					if (this.category.length > 0) {
						console.log(this.category.indexOf(sneaker.category))
						if (this.category.indexOf(sneaker.category) === -1) {
							this.category.push(sneaker.category)
						}
					} else {

						this.category.push(sneaker.category)
					}
				})
				this.loading = false
				this.search = value
				console.log(this.category)
			}
		}
	},
	data() {
		return {
			sneakers: [],
			BASE_URL: "http://localhost:8081/assets/uploads/",
			search: '',
			results: [],
			category: [],
			loading: false,
		}
	},
	async created() {
		this.sneakers = (await SneakersService).data
	},
	methods: {
		wait(ms) {
			return x => {
				return new Promise(resolve => setTimeout(() => resolve(x), ms));
			};
		},
		appendResults: function () {
			if (this.sneakers.length < this.results.length) {
				let toAppend = this.results.slice(
					this.sneakers.length,
					LOAD_NUM + this.sneakers.length
				)
				this.sneakers = this.sneakers.concat(toAppend)
			}
		},
		navigateTo(route) {
			this.$router.push(route)
		},
		async deleteSneaker(sneaker) {
			try {
				await SneakersService.delete(sneaker)
				this.refreshData()
			} catch (err) {
				console.log(err)
			}
		},
		async refreshData() {
			this.sneakers = (await SneakersService.index()).data
		},
		setCategory(keyword) {
			if (keyword === ' ') {
				this.search = ''
				console.log('null')
			} else {
				this.search = keyword
			}
		},
		async deleteSneaker(sneaker) {
			let result = confirm("ลบ Sneaker หรือไม่?");
			if (result) {
				try {
					await SneakerService.delete(sneaker);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
	updated() {
		let sens = document.querySelector('#blog-list-bottom')
		pageWatcher = ScrollMonitor.create(sens)
		pageWatcher.enterViewport(this.appendResults)
	},
	beforeUpdated() {
		if (pageWatcher) {
			pageWatcher.destroy()
			pageWatcher = null
		}
	}
}
}
</script>
<style scoped>
.empty-blog {
	width: 100%;
	text-align: center;
	padding: 10px;
	background: darksalmon;
	color: white;
}
.h6{
	margin-top: 10px;
	margin-bottom: 5px;
}

/* thumbnail */
.thumbnail-pic img {
	width: 200px;
	padding: 5px 10px 0px 0px;
}
.createcafe{
	margin: 10px;
	margin-top: 10px;
	margin-left: 100px;
}
.blog-info {
	float: left;
}

.blog-pic {
	float: left;
}

.clearfix {
	clear: both;
}

.blog-list {
	border: solid 1px #dfdfdf;
	margin-bottom: 10px;
	margin-left: auto;
	margin-right: auto;
	padding: 5px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
}

.blog-header {
	margin-left: auto;
	margin-right: auto;
}

#blog-list-bottom {
	padding-top: 4px;
}

.blog-load-finished {
	padding: 4px;
	text-align: center;
	background: seagreen;
	color: white;
}

.categories {
	margin-top: 10px;
	padding: 0;
	list-style: none;
	float: left;
}

.categories li {
	float: left;
	padding: 2px;
}

.categories li a {
	padding: 5px 10px 5px 10px;
	background: paleturquoise;
	color: black;
	text-decoration: none;
}

.categories li.clear a {
	background: tomato;
	color: white
}

.create-blog {
	margin-top: 10px;
}
.box{
  padding: 5px;
  border: 2px solid gray;

}
.cafe{
	margin-top: 10px;
}
</style>