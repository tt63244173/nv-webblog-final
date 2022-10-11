<template>
	<div>
		<br>
	  <h1>ดู Sneaker</h1>
	  <p>Name {{ sneaker.name }}</p>
	  <div v-html="sneaker.content.slice()"></div>
	  <p>Brand: {{ sneaker.brand }}</p>
	  <p>Price: {{ sneaker.price }} $</p> 
	  <p>Status: {{ sneaker.status }}</p>
	  <p><button v-on:click="navigateTo('/sneaker/edit/' + sneaker.id)">แก้ไข Sneaker</button>
	  <button v-on:click="navigateTo('/sneakers')">กลับ</button></p>
	</div>
  </template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.min.js'
import SneakerService from "@/services/SneakerService";
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
			sneaker: null,
		};
	},
	async created() {
		try {
			let sneakerId = this.$route.params.sneakerId;
			this.sneaker = (await SneakerService.show(sneakerId)).data;
		} catch (error) {
			console.log(error);
		}
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
				await SneakerService.deleteSneaker(sneaker)
				this.refreshData()
			} catch (err) {
				console.log(err)
			}
		},
		async refreshData() {
			this.sneakers = (await SneakerService.index()).data
		},
		setCategory(keyword) {
			if (keyword === ' ') {
				this.search = ''
				console.log('null')
			} else {
				this.search = keyword
			}
		},
	},
	updated() {
		let sens = document.querySelector('#sneaker-list-bottom')
		pageWatcher = ScrollMonitor.create(sens)
		pageWatcher.enterViewport(this.appendResults)
	},
	beforeUpdated() {
		if (pageWatcher) {
			pageWatcher.destroy()
			pageWatcher = null
		}
	}
};
</script>
<style scoped>
.createcafe{
	margin: 10px;
	margin-top: 10px;
	margin-left: 100px;
}
.center{
	text-align: center;
	}
.box{
  padding: 10px;
  border: 5px solid gray;

}
</style>
