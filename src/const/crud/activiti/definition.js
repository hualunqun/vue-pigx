export const tableOption = {
    border: true,
    selection: true,
    tip: false,
    stripe: true,
    menuAlign: 'center',
    menuWidth: 80,
    align: 'center',
    editBtn: false,
    delBtn: false,
    addBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    column: [{
        fixed: true,
        label: '流程ID',
        prop: 'deploymentId',
        editDisabled: true,
        addDisplay: false
    }, {
        fixed: true,
        label: '流程KEY',
        prop: 'key',
        editDisabled: true,
        search: true,
        addDisplay: false
    }, {
        label: '流程名称',
        prop: 'name',
        search: true,
        addDisplay: false
    }, {
        label: '版本',
        prop: 'version',
        addDisplay: false
    }, {
        label: '流程描述',
        prop: 'description',
        editDisabled: false,
        addDisplay: false
    }, {
        label: '所属分类',
        prop: 'category',
        editDisabled: true,
        addDisplay: false,
        search: true,
    }, {
        label: '部署时间',
        prop: 'deploymentTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        valueFormat: 'timestamp',
        editDisabled: true,
        addDisplay: false
    }, {
        label: '流程定义',
        prop: 'resourceName',
        editDisabled: true,
        addDisplay: false
    }, {
        label: '流程图',
        prop: 'diagramResourceName',
        editDisabled: true,
        addDisplay: false
    }, {
        label: '流程定义状态',
        prop: 'suspendStateName',
        editDisabled: true,
        addDisplay: false
    }]
}
