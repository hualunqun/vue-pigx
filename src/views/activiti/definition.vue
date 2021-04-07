<template>
    <div class="execution">
        <basic-container>
            <avue-crud
                ref="crud"
                :page="page"
                :data="tableData"
                :table-loading="tableLoading"
                :option="tableOption"
                @on-load="getList"
                @selection-change="selectionChange"
                @search-change="searchChange"
                @refresh-change="refreshChange"
                @size-change="sizeChange"
                @current-change="currentChange">
                <template slot-scope="scope" slot="menuLeft">
                    <form id="baseUploadForm" class="upload-form"
                          accept-charset="utf-8" enctype="multipart/form-data">
                        <el-button type="primary"
                                   icon="el-icon-upload"
                                   size="small"
                                   @click="fileClick">部署流程定义</el-button>
                        <input type="file"
                               name="file"
                               :id="id"
                               ref="fileInput"
                               @change="uploadFile($event)"
                               style="display: none;">
                    </form>
                </template>
                <template
                    slot-scope="scope"
                    slot="menu">
                    <el-row class="definition-btn-row">
                        <el-button type="text" size="small" @click="suspendOrActiveApplyBtn(scope.row)"
                                   icon="el-icon-lock" >{{scope.row.suspendState==1?'挂起': '激活'}}</el-button>
                        <el-button type="text" size="small" @click="convert2ModelBtn(scope.row.id)"
                                   icon="el-icon-sort">转模型</el-button>
                        <el-button type="text" size="small" @click="delDefinitionBtn(scope.row.deploymentId)"
                                   icon="el-icon-delete">删除</el-button>
                    </el-row>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
    import {delObj,uploadObj,suspendOrActiveApply,convert2Model, fetchList} from '@/api/activiti/definition'
    import {tableOption} from '@/const/crud/activiti/definition'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Activiti',
        data() {
            return {
                searchForm: {},
                tableData: [],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 10 // 每页显示多少条
                },
                tableLoading: false,
                tableOption: tableOption,
                id:this._uid,
            }
        },
        computed: {
            ...mapGetters(['permissions'])
        },
        methods: {
            getList(page, params) {
                this.tableLoading = true
                fetchList(Object.assign({
                    descs: 'create_time',
                    current: page.currentPage,
                    size: page.pageSize
                }, params, this.searchForm)).then(response => {
                    this.tableData = response.data.data.records
                    this.page.total = response.data.data.total
                    this.tableLoading = false
                })
            },
            handleView(row) {
                const name = `模型id为${row.id}的${row.name}流程图`,
                    src = `/activti/detail/${row.id}`
                this.$router.push({
                    path: src,
                    query: {
                        name: name
                    }
                })
            },
            handleDeploy: function (row) {
                this.$confirm('是否确认部署ID为"' + row.id + '"的模型?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return deploy(row.id)
                }).then(() => {
                    this.getList(this.page)
                    this.$message.success('部署成功')
                })
            },
            searchChange(form, done) {
                this.searchForm = form
                this.page.currentPage = 1
                this.getList(this.page, form)
                done()
            },
            sizeChange(pageSize) {
                this.page.pageSize = pageSize
            },
            currentChange(current) {
                this.page.currentPage = current
            },
            refreshChange() {
                this.getList(this.page)
            },
            selectionChange(list){
                console.log(list)
                // this.$message.success('选中的数据'+ JSON.stringify(list));
            },
            fileClick() {
                document.getElementById(`${this.id}`).click()
            },
            uploadFile($event) {
                let fileType,
                    fileSize,
                    file,
                    fileList = ["jpg", "jpeg", "png"],
                    maxFileSize = 10240;
                file = document.getElementById(`${this.id}`)
                let fileTarget = $event.target.files[0];
                let formData = new FormData()
                formData.append('file', fileTarget)
                uploadObj(formData).then(res => {
                    this.$message.success('操作成功')
                })
            },
            suspendOrActiveApplyBtn(row) { // 挂起或激活
                suspendOrActiveApply({
                    id: row.id,
                    suspendState: row.suspendState,
                }).then(response => {
                    this.$message.success('操作成功')
                    this.getList(this.page)
                })
            },
            delDefinitionBtn(deploymentId) { // 删除
                this.$confirm('是否确认删除ID为"' + deploymentId + '"的模型?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return delObj(deploymentId)
                }).then(() => {
                    this.getList(this.page)
                    this.$message.success('删除成功')
                })
            },
            convert2ModelBtn(id) { // 转模型
                convert2Model(id).then(response => {
                    this.$message.success('操作成功')
                    this.getList(this.page)
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .definition-btn-row{
        .el-button+.el-button{
            margin-left: 0;
        }
    }
</style>
