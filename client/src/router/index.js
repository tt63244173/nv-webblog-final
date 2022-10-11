import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'
import Login from '@/components/Login'

import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'

import SneakerIndex from '@/components/Sneakers/Index'
import SneakerCreate from '@/components/Sneakers/CreateSneaker'
import SneakerEdit from '@/components/Sneakers/EditSneaker'
import SneakerShow from '@/components/Sneakers/ShowSneaker'

import CommentIndex from '@/components/Comments/Index'

import Upload from '@/components/Utils/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //blog
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },{
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    //Place
    {
      path: '/sneakers',
      name: 'sneakers',
      component: SneakerIndex
    },
    {
      path: '/sneaker/create',
      name: 'sneaker-create',
      component: SneakerCreate
    },{
      path: '/sneaker/edit/:sneakerId',
      name: 'sneaker-edit',
      component: SneakerEdit
    },
    {
      path: '/sneaker/:sneakerId',
      name: 'sneaker',
      component: SneakerShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    }
  ]
})
