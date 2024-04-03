<template>
  <div id="application-manage">
    <el-row>
      <el-col :span="22">
        <!--这个属性接收名称，下面统一定义 -->
        <el-input placeholder="请输入名称" type="text" v-model="query"></el-input>
      </el-col>
      <el-col :span="2">
        <!-- 按钮事件也是下面统一定义 -->
        <el-button type="primary" @click="setQueryName">搜索</el-button>
      </el-col>
    </el-row>
    <!--tableData是表格数据-->
    <el-table :data="tableData" id="gbox" :useIndex="true" :stripe="true" :border="true" :fit="true" :useMultiSelect="false">
      <!--第一列序号-->
      <el-table-column type="index" label="序号" width="55" align="center">
      </el-table-column>
      <el-table-column v-for="(col,index) in columns" :key="index" :label="col.label" :prop="col.prop" :width="col.width">
        <template v-slot="{column,row}">
          <div v-if="column.property==='status'">
            <el-tag :type="row[column.property==='status']|statusColor">{{ row[column.property] | status }} </el-tag>
          </div>
          <div v-else-if="column.property==='opts'">
            <el-button :disabled="[0,2,3,6].indexOf(row['status'])===-1" @click="showEdit(row)" type="primary">编辑</el-button>
            <el-button @click="delLoan(row.id)" type="danger">删除</el-button>
            <el-button :disabled="[0,2,3,6].indexOf(row['status'])===-1" @click="submit(row.id)" type="success">提交审核</el-button>
          </div>
          <div v-else>
            {{ row[column.property] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" @size-change="updateSize" :page-sizes="[10,20,30,40]" :page-size="pageOptions.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="rows">
    </el-pagination>
    <!--dialogVisible变量控制对话框是否显示-->
    <el-dialog title="申请管理-编辑" :visible="dialogVisible" @close="dialogVisible=false" width="30%">
      <div class="form-box">
        <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :xl=20 :lg=20 :md=12 :sm=24 :xs=24>
              <el-form-item label="姓名" prop="name">
                <el-input type='input' v-model="updateForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=20 :lg=20 :md=12 :sm=24 :xs=24>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="updateForm.sex">
                  <el-option key="man" label="男" value="man">
                  </el-option>
                  <el-option key="woman" label="女" value="woman">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="btns clear-fix">
          <div>
            <el-button type="primary" @click="submitUpdate">提交</el-button>
            <el-button @click="cleanFrom">重置</el-button>
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLoanList, udpatedLoan, deleteLoan, submitApprove } from '@/apis/loan.js'
export default {
  data () {
    return {
      query: '',
      tableData: [],
      columns: [
        {
          label: "姓名",
          prop: "name",
          width: "80",
        },
        {
          label: "出生日期",
          prop: "birthday",
          width: "160",
        },
        {
          label: "性别",
          prop: "sex",
        },
        {
          label: "教育程度",
          prop: "education",
        },
        {
          label: "居住地址",
          prop: "address1",
        },
        {
          label: "手机号",
          prop: "mobile_phone",
        },
        {
          label: "申请状态",
          prop: "status",
        },
        {
          label: "操作",
          width: "280",
          prop: "opts",
        },
      ],
      pageOptions: {
        pageNo: 1,
        pageSize: 10
      },
      rows: 0,//总条数
      updateForm: {
        name: '',
        sex: '',
        id: 0
      },
      rules: {
        name: [{ required: true, message: '必须填写用户名' }],
        sex: [{ required: true, message: '必须填写性别' }],
      },
      dialogVisible: false
    }
  },
  methods: {
    async setQueryName () {
      this.pageOptions.name = this.query
      await this.getLoanList()
      this.pageOptions.name = null
    },
    async getLoanList () {
      let res = await getLoanList(this.pageOptions)
      if (res.data.code = 20000) {
        this.tableData = res.data.data.data.data.map(item => {
          item.birthday = this.getBirthday(item.birthday);
          item.sex = this.getSex(item.sex)
          item.education = this.getEducation(item.education);
          return item;
        })
        console.log(this.tableData);
        this.rows = res.data.data.rows
      }
    },
    getBirthday (date) {
      let dateNow = new Date(date);
      function convert (data) {
        return data < 10 ? "0" + data : data;
      }
      let year = dateNow.getFullYear();
      let month = convert(dateNow.getMonth());
      let day = convert(dateNow.getDate());

      let hours = convert(dateNow.getHours());
      let minutes = convert(dateNow.getMinutes());
      let seconds = convert(dateNow.getSeconds());
      let dateStr =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return dateStr;
    },
    getSex (str) {
      return str === "man" ? "男" : "女";
    },
    getEducation (str) {
      return str === "college" ? "大学" : "高中";
    },
    showEdit (row) {

    },
    async delLoan (id) {

    },
    async submit (id) {

    },
    // 删除
    async delLoan (id) {
      let res = await deleteLoan(id)
      // 20000代表成功
      if (res.data.code === 20000) {
        this.getLoanList()
      }
    },
    // 提交审核
    async submit (id) {
      let res = await submitApprove(id)
      if (res.data.code === 20000) {
        this.getLoanList()
      }
    },
    // 编辑
    showEdit (row) {
      this.updateForm.id = row.id
      this.updateForm.name = row.name
      this.updateForm.sex = row.sex
      this.dialogVisible = true
    },
    // 编辑提交
    async submitUpdate () {
      let res = await udpatedLoan(this.updateForm)
      if (res.data.code === 20000) {
        this.cleanFrom()
        this.dialogVisible = false
        this.getLoanList()
      }
    },
    cleanFrom () {
      this.$refs["updateForm"].resetFields()
    },
    // 改变页数
    handleCurrentChange (pageNo) {
      this.pageOptions.pageNo = pageNo
      this.getLoanList()
    },
    updateSize (pageSize) {
      this.pageOptions.pageSize = pageSize
      this.getLoanList()
    }
  },
  mounted () {
    this.getLoanList()
  },
  filters: {
    statusColor (status) {
      switch (status) {
        case 0:
          return 'success'
          break
        case 1:
          return ''
          break
        case 2:
          return 'success'
          break
        case 3:
          return 'danger'
          break
        case 4:
          return 'warning'
          break
        case 5:
          return 'success'
          break
        case 6:
          return 'danger'
          break
        case 7:
          return 'success'
          break
        default:
          return 'danger'

      }
    },
    status (status) {
      switch (status) {
        case 0:
          return '进件'
          break
        case 1:
          return '提交初审'
          break
        case 2:
          return '初审通过'
          break
        case 3:
          return '初审拒绝'
          break
        case 4:
          return '提交终审'
          break
        case 5:
          return '终审通过'
          break
        case 6:
          return '终审拒绝'
          break
        case 7:
          return '生成合同'
          break
        default:
          return '出错了'
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
  width: 100%;
}
.btns {
  text-align: center;
}

.box-card {
  margin-bottom: 10px;
  > div {
    > div {
      text-align: left;
    }
  }
}
.el-row {
  margin-bottom: 10px;
}
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>