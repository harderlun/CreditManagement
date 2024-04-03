<template>
  <div id="input-manager">
    <el-row>
      <el-col :span="22">
        <el-input placeholder="请输入名称" type="text" v-model="query"></el-input>
      </el-col>
      <el-col :span="2">
        <!-- 按钮 -->
        <el-button type="primary" @click="setQueryName">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" id="gbox" :useIndex="true" :stripe="true" :border="true" :fit="true" :useMultiSelect="false">
      <el-table-column type="index" label="序号" width="55" align="center">
      </el-table-column>
      <el-table-column v-for="(col,index) in columns" :key="index" :label="col.label" :prop="col.prop" :width="col.width">
        <!--插槽，如果当前列是操作，添加三个按钮-->
        <template v-slot="{ column,row}">
          <div v-if="column.property==='opts'">
            <el-button @click="showInfo(row)" type="primary">查看</el-button>
            <!-- 传入pass和reject代表调用通过或者拒绝接口-->
            <el-button @click="submit(row.id,'pass')" type="success">通过</el-button>
            <el-button @click="submit(row.id,'reject')" type="danger">拒绝</el-button>
          </div>
          <div v-else>
            {{ row[column.property] }}
          </div>
        </template>

      </el-table-column>
    </el-table>
    <el-dialog title="贷款审批-查看详情" :visible="dialogVisible" @close="dialogVisible=false" width="30%">
      <div class="form-box" v-if="dialogVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="id" prop="id">
                <el-input type='input' v-model="form.id" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="姓名" prop="name">
                <el-input type='input' v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="出生日期" prop="birthday">
                <el-input type='input' v-model="form.birthday" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="性别" prop="sex">
                <el-input type='input' v-model="form.sex" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="教育程度" prop="education">
                <el-input type='input' v-model="form.education" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="地址" prop="address1">
                <el-input type='input' v-model="form.address1" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="手机号" prop="phone">
                <el-input type='input' v-model="form.phone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
              <el-form-item label="身份证" prop="identity_card">
                <el-input type='input' v-model="form.identity_card" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="btns clear-fix">
          <div>
            <el-button type="primary" @click="dialogVisible=!dialogVisible">取消</el-button>

          </div>
        </div>

      </div>
    </el-dialog>
    <el-pagination @current-change="handleCurrentChange" @size-change="updateSize" :page-sizes="[10,20,30,40]" :page-size="pageOptions.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="rows">
    </el-pagination>
  </div>
</template>

<script>
import { queryEndList, approveEnd } from "@/apis/loan.js";
export default {
  data () {
    return {
      form: {

      },
      dialogVisible: false,
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
          label: "身份证",
          prop: "identity_card",
          width: "260",
        },
        {
          label: "操作",
          // width: "280",
          prop: "opts",
        },
      ],
      rows: 0,
      pageOptions: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    async setQueryName () {
      this.pageOptions.name = this.query
      await this.getFirstList()
      this.pageOptions.name = null
    },
    async getFirstList () {
      let res = await queryEndList(this.pageOptions);
      if (res.data.code === 20000) {
        this.tableData = res.data.data.data.data.map((item) => {
          item.birthday = this.convertBirthday(item.birthday);
          return item;
        });
        this.rows = res.data.data.rows;
      }
    },
    convertBirthday (date) {
      function convertTime (n) {
        return n < 10 ? '0' + n : n
      }
      let d2 = new Date(date)
      return d2.getFullYear() + '-'
        + convertTime(d2.getMonth() + 1) + '-'
        + convertTime(d2.getDate()) + ' '
        + convertTime(d2.getHours()) + ':'
        + convertTime(d2.getSeconds()) + ':'
        + convertTime(d2.getMinutes())
    },
    // 查看
    showInfo (row) {
      this.form = row
      this.dialogVisible = true
    },
    // 审批
    async submit (id, flag) {
      let res = await approveEnd(id, flag);
      if (res.data.code === 20000) {
        this.getFirstList()
      }
    },
    // 分页器
    handleCurrentChange (pageNo) {
      this.pageOptions.pageNo = pageNo
      this.getFirstList()
    },
    updateSize (pageSize) {
      this.pageOptions.pageSize = pageSize
      this.getFirstList()

    },

  },
  mounted () {
    this.getFirstList();
  },
}
</script>
<style lang="scss" scoped>
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
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
</style>