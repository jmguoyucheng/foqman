<template>
  <div id="print">
    <el-button type="primary" icon="el-icon-printer" @click="printCustomers">打印</el-button>
    <div id="print-customers">
      <el-table
        :data="customers"
        stripe
        border>
        <el-table-column
          prop="orderNum"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="50">
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
          width="105">
        </el-table-column>
        <el-table-column
          prop="address"
          label="住址"
          width="130">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          width="70">
        </el-table-column>
        <el-table-column
          label="销售方案"
          width="130">
          <template slot-scope="scope">
            <p v-for="item in scope.row.saleStrategies" v-if="item.enable">{{ item.saleCategory.name }}:{{item.amount}}({{item.cron}})</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="expireDays"
          label="剩余天数"
          :formatter="expireFormat"
          width="80">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import ElContainer from "../../../../node_modules/element-ui/packages/container/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form";
  import {mapGetters} from 'vuex'
  export default {
    components: {ElForm, ElRow, ElContainer},
    created(){
      this.listCustomer()
    },
    computed: mapGetters({
      customers: 'customers/customers'
    }),
    methods: {
      printCustomers(){
        let subOutputRankPrint = document.getElementById('print-customers');
        console.log(subOutputRankPrint.innerHTML);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
      },
      listCustomer(){
        var params = {}
        params.pageSize = 99999999;
        params.currentPage = 1
        this.$store.dispatch('customers/getCustomers', params);
      },
      expireFormat(row, column){
        var expire = row[column.property];
        return expire == 999999 ? '无限期' : expire;
      },
    }
  }
</script>
<style scoped>
  .el-button {
    margin: 5px auto;
  }
</style>
