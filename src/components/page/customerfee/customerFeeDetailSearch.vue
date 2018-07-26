<template>
  <div id="customerFeeDetailSearch">
    <el-form :inline="true">
      <el-form-item>
        <el-select style="width: 150px" placeholder="请选择查询方式" v-model="listMode" @change="listCustomerFeeDetails">
          <el-option label="按客户ID查询" value="byId"></el-option>
          <el-option label="按姓名查询" value="byName"></el-option>
          <el-option label="按手机号码查询" value="byMobile"></el-option>
          <el-option label="按住址查询" value="byAddress"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input style="width: 250px" placeholder="请输入查询内容" v-model="keyValue" @input="onKeyChange"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="listCustomerFeeDetails">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="el-icon-printer" @click="printCustomerFeeDetail">打印</el-button>
    <div id="print-customerFeeDetail">
      <el-table
        :data="customerFeeDetails"
        stripe
        border>
        <el-table-column
          prop="id"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="occurTime"
          label="发生时间"
          :formatter="dateFormat"
          width="145">
        </el-table-column>
        <el-table-column
          prop="customerId"
          label="客户编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="60">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="60">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          width="105">
        </el-table-column>
        <el-table-column
          prop="address"
          label="住址"
          width="130">
        </el-table-column>
        <el-table-column
          prop="saleStrategies"
          label="扣费方案"
          width="80">
        </el-table-column>
        <el-table-column
          prop="accurAmmount"
          label="发生金额"
          width="70">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          width="70">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import ElContainer from "../../../../node_modules/element-ui/packages/container/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form";
  import {mapGetters} from 'vuex'
  import {formatRelative} from 'date-fns'
  //  import { es, ru } from 'date-fns/esm/locale'

  export default {
    components: {ElForm, ElRow, ElContainer},
    data(){
      return {
        listMode: '',
        keyValue: '',
        pageSize: 10,
        currentPage: 1,
        recharge: 0,
        timeOut: {}
      }
    },
    mounted(){
      this.listCustomerFeeDetails()
    },
    computed: mapGetters({
      customerFeeDetails: 'customerFeeDetails/customerFeeDetails',
      total: 'customerFeeDetails/total'
    }),
    methods: {
      onKeyChange(){
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.listCustomerFeeDetails()
        }, 500);
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.listCustomerFeeDetails()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.listCustomerFeeDetails()
      },
      listCustomerFeeDetails(){
        var params = {}
        params.listMode = this.listMode
        params.keyValue = this.keyValue
        params.pageSize = this.pageSize
        params.currentPage = this.currentPage
        this.$store.dispatch('customerFeeDetails/getCustomerFeeDetails', params);
      },
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        const format = require('date-fns/format');
        return format(new Date(date), "YYYY-MM-DD HH:mm:ss");
      },
      printCustomerFeeDetail(){
        let subOutputRankPrint = document.getElementById('print-customerFeeDetails');
        console.log(subOutputRankPrint.innerHTML);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
      },
    }
  }
</script>
<style scoped>
  .el-form {
    text-align: left;
  }

  .el-table {
    margin-top: 10px;
  }

  .el-pagination {
    margin: 10px 0px;
  }

  .el-button {
    margin: auto 2px;
  }
</style>
