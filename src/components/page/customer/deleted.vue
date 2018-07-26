<template>
  <div id="search">
    <el-form :inline="true">
      <el-form-item>
        <el-select style="width: 150px" placeholder="请选择查询方式" v-model="listMode">
          <el-option label="按姓名查询" value="byName"></el-option>
          <el-option label="按手机号码查询" value="byMobile"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input style="width: 250px" placeholder="请输入查询内容" v-model="keyValue" @input="onKeyChange"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="listCustomer">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="customers"
      stripe
      border>
      <el-table-column
        prop="id"
        label="编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="70">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        width="70">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="住址"
        width="240">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
        width="70">
      </el-table-column>
      <el-table-column label="操作">

      </el-table-column>
    </el-table>
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
    created(){
      this.listDeletedCustomer()
    },
    computed: mapGetters({
      customers: 'customers/customers',
      total: 'customers/total'
    }),
    methods: {
      onKeyChange(){
//        var t;
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.listDeletedCustomer()
        }, 500);
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.listDeletedCustomer()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.listDeletedCustomer()
      },
      listDeletedCustomer(){
        var params = {}
        params.listMode = this.listMode
        params.keyValue = this.keyValue
        params.pageSize = this.pageSize
        params.currentPage = this.currentPage
        this.$store.dispatch('customers/getDeletedCustomers', params);
      },
      dateFormat(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        const format = require('date-fns/format');
        return format(new Date(date), "YYYY-MM-DD");
      },
      expireFormat(row, column){
        var expire = row[column.property];
        return expire==999999?'无限期':expire;
      },
    }
  }
</script>
<style scoped>
  .el-form {
    text-align: left;
  }

  .el-pagination {
    margin: 10px 0px;
  }

  .el-button {
    margin: auto 2px;
  }
</style>
