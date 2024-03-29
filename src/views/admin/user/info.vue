<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <template>
        <el-tabs @tab-click="switchTab">
          <el-tab-pane label="信息管理" name="userManager"/>
          <el-tab-pane label="密码管理" name="passwordManager"/>
        </el-tabs>
      </template>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form
              v-if="switchStatus==='userManager'"
              ref="ruleForm2"
              :model="ruleForm2"
              :rules="rules2"
              label-width="100px"
              class="demo-ruleForm">
              <el-form-item
                label="用户名"
                prop="username">
                <el-input
                  v-model="ruleForm2.username"
                  type="text"
                  disabled/>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm2.phone" placeholder="验证码登录使用"/>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  class="avatar-uploader"
                  action="/api/admin/sys-file/upload">
                  <img v-if="ruleForm2.avatar" id="avatar" :src="avatarUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="社交登录"
                prop="social">
                <a
                  href="#"
                  style="color: blue"
                  @click="handleClick('wechat')">绑定微信</a>｜
                <a
                  href="#"
                  style="color: blue"
                  @click="handleClick('gitee')">绑定码云</a> |
                <a
                  href="#"
                  style="color: blue"
                  @click="handleClick('osc')">开源中国</a>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm2')">提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-form
              v-if="switchStatus==='passwordManager'"
              ref="ruleForm2"
              :model="ruleForm2"
              :rules="rules2"
              label-width="100px"
              class="demo-ruleForm">
              <el-form-item
                label="原密码"
                prop="password">
                <el-input
                  v-model="ruleForm2.password"
                  type="password"
                  auto-complete="off"/>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="newpassword1">
                <el-input
                  v-model="ruleForm2.newpassword1"
                  type="password"
                  auto-complete="off"/>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="newpassword2">
                <el-input
                  v-model="ruleForm2.newpassword2"
                  type="password"
                  auto-complete="off"/>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm2')">提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import {handleImg, openWindow} from '@/util/util'
  import {mapState} from 'vuex'
  import store from '@/store'
  import {getStore, setStore} from '@/util/store'
  import {editInfo} from '@/api/admin/user'


  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.ruleForm2.password !== '') {
          if (value !== this.ruleForm2.newpassword1) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        switchStatus: 'userManager',
        avatarUrl: '',
        show: false,
        headers: {
          'Authorization': 'Bearer ' + store.getters.access_token,
        },
        ruleForm2: {
          username: '',
          password: '',
          newpassword1: '',
          newpassword2: '',
          avatar: '',
          phone: ''
        },
        rules2: {
          password: [{required: true, min: 6, message: '原密码不能为空且不少于6位', trigger: 'change'}],
          newpassword1: [{required: false, min: 6, message: '不少于6位', trigger: 'change'}],
          newpassword2: [{required: false, validator: validatePass, trigger: 'blur'}]
        }
      }
    },
    created() {
      this.resetForm()
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods: {
      switchTab(tab) {
        if (tab.name === 'userManager') {
          handleImg(this.ruleForm2.avatar, 'avatar')
        }
        this.switchStatus = tab.name
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return false
          }
          editInfo(this.ruleForm2).then(response => {
            this.handleLocalData(this.ruleForm2)
            this.$notify.success('修改成功')
            // 修改密码之后强制重新登录
            if (this.switchStatus === 'passwordManager') {
              this.$store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }
          })
        })
      },
      resetForm() {
        this.ruleForm2.password = undefined
        this.ruleForm2.newpassword1 = undefined
        this.ruleForm2.newpassword2 = undefined
        this.ruleForm2.username = this.userInfo.username
        this.ruleForm2.phone = this.userInfo.phone
        this.ruleForm2.avatar = this.userInfo.avatar
        handleImg(this.userInfo.avatar, 'avatar')
        //判断是否选择了租户ID
        const TENANT_ID = getStore({name: 'tenantId'})
        if (TENANT_ID) {
          this.headers['TENANT-ID'] = TENANT_ID // 租户ID
        }
      },
      handleClick(thirdpart) {
        let appid, client_id, redirect_uri, url
        redirect_uri = encodeURIComponent(window.location.origin + '/#/authredirect')
        if (thirdpart === 'wechat') {
          appid = 'wxd1678d3f83b1d83a'
          url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&state=WX-BIND&response_type=code&scope=snsapi_login#wechat_redirect'
        } else if (thirdpart === 'tencent') {
          client_id = '101322838'
          url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ-BIND&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        } else if (thirdpart === 'gitee') {
          client_id = '235ce26bbc59565b82c989aa3a407ce844cf59a7c5e0f9caa9bb3bf32cee5952'
          url = 'https://gitee.com/oauth/authorize?response_type=code&state=GITEE-BIND&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        } else if (thirdpart === 'osc') {
          client_id = 'neIIqlwGsjsfsA6uxNqD'
          url = 'https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=' + client_id + '&state=OSC-BIND&redirect_uri=' + redirect_uri
        }
        openWindow(url, thirdpart, 540, 540)
      },
      handleAvatarSuccess(res, file) {
        this.avatarUrl = URL.createObjectURL(file.raw)
        this.ruleForm2.avatar = res.data.url
      },
      // 处理本地数据，避免刷新不同步
      handleLocalData(form) {
        let userInfo = getStore({name: 'userInfo'})

        if (userInfo) {
          userInfo.avatar = form.avatar
          userInfo.phone = form.phone
          setStore({
            name: 'userInfo',
            content: userInfo,
            type: 'session'
          })
        }
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px !important;
    color: #8c939d !important;
    width: 178px !important;
    height: 178px !important;
    line-height: 178px !important;
    text-align: center !important;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
