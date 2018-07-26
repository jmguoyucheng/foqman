<template>
  <div id="add">
    <!--客户信息表单-->
    <el-form labelWidth="80px" :model="customer" :rules="customerRule" ref="customerForm">
      <el-row>
        <el-col :span="4">
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="姓名" v-model="customer.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="昵称" prop="nickName">
            <el-input placeholder="昵称" v-model="customer.nickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="手机" prop="mobile">
            <el-input placeholder="手机" v-model="customer.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="住址" prop="address">
            <el-input placeholder="住址" v-model="customer.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="充值金额" prop="recharge">
            <el-input type="number" placeholder="金额" v-model="customer.recharge"></el-input>
          </el-form-item>
        </el-col>
        <el-button style="margin-left: 10px" size="mini" type="primary" @click="addSaleStrategyDomain">增加销售方案


        </el-button>
      </el-row>
    </el-form>
    <!--销售方案表单-->
    <el-form :model="saleStrategyForm" ref="saleStrategyForm" label-width="80px">
      <el-row v-for="(saleStrategy, index) in saleStrategyForm.saleStrategies" :key="saleStrategy.key">
        <el-col :span="3">
          <el-form-item label="商品种类" :prop="'saleStrategies.' + index + '.saleCategory'"
                        :rules="{required: true, message: '商品种类不能为空', trigger: 'change'}">
            <el-select v-model="saleStrategy.saleCategory" placeholder="商品种类" value-key="id">
              <el-option
                v-for="item in saleCategories"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="数量" :prop="'saleStrategies.' + index + '.amount'"
                        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
            <el-input type="number" v-model="saleStrategy.amount" placeholder="数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="价格" :prop="'saleStrategies.' + index + '.totalPrice'"
                        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
            <el-input type="number" v-model="saleStrategy.totalPrice" placeholder="价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="周期" :prop="'saleStrategies.' + index + '.cron'"
                        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
            <el-input v-model="saleStrategy.cron" placeholder="周期"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="生效日期" prop="startTime">
            <el-date-picker style="width: 130px"
                            v-model="saleStrategy.startTime"
                            align="right"
                            type="date"
                            placeholder="生效日期"
                            value-format="timestamp"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="失效日期" prop="endTime">
            <el-date-picker style="width: 130px"
                            v-model="saleStrategy.endTime"
                            align="right"
                            type="date"
                            placeholder="失效日期"
                            value-format="timestamp"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-button style="margin-left: 10px" @click="removeSaleStrategyDomain(saleStrategy)">删除</el-button>
      </el-row>
    </el-form>
    <!--添加、重置按钮-->
    <el-form>
      <el-row style="text-align: center">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="submitForm('customerForm','saleStrategyForm')">添加





          </el-button>
          <el-button icon="el-icon-setting" @click="resetForm('customerForm')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!--客户信息查询表单-->
    <el-form :inline="true">
      <el-form-item label="查询方式">
        <el-select style="width: 150px" placeholder="请选择查询方式" v-model="listMode" @change="listCustomers">
          <el-option label="按客户ID查询" value="byId"></el-option>
          <el-option label="按姓名查询" value="byName"></el-option>
          <el-option label="按手机号码查询" value="byMobile"></el-option>
          <el-option label="按地址查询" value="byAddress"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="查询内容">
        <el-input style="width: 250px" placeholder="请输入查询内容" v-model="keyValue" @input="onKeyChange"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="listCustomers">查询</el-button>
      </el-form-item>
    </el-form>
    <!--客户信息显示表格-->
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
        label="客户编号"
        width="70">
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
        width="102">
      </el-table-column>
      <el-table-column
        prop="address"
        label="住址"
        width="157">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
        width="60">
      </el-table-column>
      <el-table-column
        label="销售方案"
        width="140">
        <template slot-scope="scope">
            <div style="float: left" v-for="item in scope.row.saleStrategies">
              <p v-if="item.enable">{{ item.saleCategory.name }}:{{item.amount}}({{item.cron}})</p>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="expireDays"
        label="剩余天数"
        :formatter="expireFormat"
        width="70">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="recharged(scope.row.id,scope.row.name)">充值</el-button>
          <el-button size="mini" type="success" @click="modifyCustomer(scope.row.id)">修改</el-button>
          <el-button size="mini" type="warning" @click="adjustCost(scope.row.id)">调整费用</el-button>
          <el-button size="mini" type="danger" @click="deleteCustomer(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
    <!--修改客户信息对话框-->
    <el-dialog width="1160px" title="修改客户信息" :visible.sync="dialogModifyCustomerVisible">
      <!--修改客户信息表单-->
      <el-form :inline="true" label-width="60px" :model="customerModify" :rules="customerRule" ref="customerModifyForm">
        <el-form-item label="姓名" prop="name">
          <el-input class="modify-customer-medium" placeholder="请输入姓名" v-model="customerModify.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input class="modify-customer-medium" placeholder="请输入昵称" v-model="customerModify.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input class="modify-customer-wide" placeholder="请输入手机号码" v-model="customerModify.mobile"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input class="modify-customer-wide" placeholder="请输入住址" v-model="customerModify.address"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="number" class="modify-customer-medium" placeholder="编号"
                    v-model="customerModify.suffixId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addSaleStrategyModifyDomain">增加销售方案</el-button>
        </el-form-item>
      </el-form>
      <!--销售方案表单-->
      <el-form :inline="true" label-width="60px" :model="saleStrategyModifyForm" ref="saleStrategyModifyForm">
        <div v-for="(saleStrategy, index) in saleStrategyModifyForm.saleStrategies" :key="saleStrategy.key">
          <el-form-item label="种类" :prop="'saleStrategies.' + index + '.saleCategory'"
                        :rules="{required: true, message: '商品种类不能为空', trigger: 'change'}">
            <el-select class="modify-customer-medium" v-model="saleStrategy.saleCategory" placeholder="请选择商品种类"
                       value-key="id">
              <el-option
                v-for="item in saleCategories"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :prop="'saleStrategies.' + index + '.amount'"
                        :rules="{required: true, message: '数量不能为空', trigger: 'blur'}">
            <el-input type="number" class="modify-customer-narrow" v-model="saleStrategy.amount"
                      placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="价格" :prop="'saleStrategies.' + index + '.totalPrice'"
                        :rules="{required: true, message: '价格不能为空', trigger: 'blur'}">
            <el-input type="number" class="modify-customer-medium" v-model="saleStrategy.totalPrice"
                      placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="周期" :prop="'saleStrategies.' + index + '.cron'"
                        :rules="{required: true, message: '周期表达式不能为空', trigger: 'blur'}">
            <el-input class="modify-customer-medium" v-model="saleStrategy.cron" placeholder="请输入周期"></el-input>
          </el-form-item>
          <el-form-item label="生效" prop="startTime">
            <el-date-picker style="width: 130px"
                            v-model="saleStrategy.startTime"
                            align="right"
                            type="date"
                            placeholder="生效日期"
                            value-format="timestamp"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效" prop="endTime">
            <el-date-picker style="width: 130px"
                            v-model="saleStrategy.endTime"
                            align="right"
                            type="date"
                            placeholder="失效日期"
                            value-format="timestamp"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-button @click="removeSaleStrategyModifyDomain(saleStrategy)">删除</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyCustomerVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmModifyCustomer">确定</el-button>
      </div>
    </el-dialog>
    <!--调整费用对话框-->
    <el-dialog width="30%" title="调整费用" :visible.sync="dialogAdjustCostVisible">
      <el-form :inline="true" labelWidth="60px" :model="costAdjust" ref="costAdjustForm">
        <el-form-item label="费用" prop="cost" :rules="{required: true, message: '费用不能为空', trigger: 'blur'}">
          <el-input type="number" style="width: 300px" v-model="costAdjust.cost" placeholder="请输入要调整的费用"
                    ref="cost"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input style="width: 300px" v-model="costAdjust.description" placeholder="请输入说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdjustCostVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAdjustCost()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ElContainer from "../../../../node_modules/element-ui/packages/container/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form";
  import {mapGetters} from 'vuex'
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  import {formatRelative} from 'date-fns'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  //  import {addMinutes} from 'date-fns'
  //  import {compareAsc} from 'date-fns/compare_asc'
  export default {
    components: {ElButton, ElInput, ElFormItem, ElCol, ElForm, ElRow, ElContainer},
    data(){
      return {
        customer: {},
        saleStrategyForm: {
          saleStrategies: [{cron: 'mon-sun'}]
        },
        customerModify: {},
        saleStrategyModifyForm: {
          saleStrategies: []
        },
        costAdjust: {},
        pickerOptions: {
          disabledDate(time) {
            return new Date(time.toDateString() + ' 13:30:00') < Date.now()
          },
          firstDayOfWeek: 1
        },
        listMode: '',
        keyValue: '',
        pageSize: 10,
        currentPage: 1,
        dialogModifyCustomerVisible: false,
        dialogAdjustCostVisible: false,
        customerRule: {
          name: [
            {required: true, message: '商品种类不能为空', trigger: 'blur'},
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '住址不能为空', trigger: 'blur'}
          ],
          recharge: [
            {required: true, message: '充值金额不能为空', trigger: 'blur'},
          ],
          startDate: [
            {required: true, message: '送奶起始日期不能为空', trigger: 'blure'}
          ]
        }
      }
    },
    mounted(){
      this.listCustomers();
      this.listSaleCategories();
    },
    computed: mapGetters({
      customers: 'customers/customers',
      total: 'customers/total',
      saleCategories: 'saleCategories/saleCategories'
    }),
    methods: {
      // 增加一行销售方案
      addSaleStrategyDomain(){
        this.saleStrategyForm.saleStrategies.push({
          key: Date.now()
        });
      },
      // 增加一行修改对话框中的销售方案
      addSaleStrategyModifyDomain(){
        this.saleStrategyModifyForm.saleStrategies.push({
          key: Date.now()
        });
      },
      // 删除一行销售方案
      removeSaleStrategyDomain(item) {
        var index = this.saleStrategyForm.saleStrategies.indexOf(item)
        if (index !== -1) {
          this.saleStrategyForm.saleStrategies.splice(index, 1)
        }
      },
      // 删除一行修改对话框中的销售方案
      removeSaleStrategyModifyDomain(item) {
        var index = this.saleStrategyModifyForm.saleStrategies.indexOf(item)
        if (index !== -1) {
          this.saleStrategyModifyForm.saleStrategies.splice(index, 1)
        }
      },
      // 搜索框内容发生变化时触发，设置500毫秒间隔
      onKeyChange(){
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.listCustomers()
        }, 500);
      },
      // 提交表单
      submitForm(formCustomer, formSaleStrategy){
        let validateResult = true;
        this.$refs[formCustomer].validate((valid) => {
          if (!valid) {
            console.log('客户信息表单验证失败！');
            validateResult = false;
          }
        });
        this.$refs[formSaleStrategy].validate((valid) => {
          if (!valid) {
            console.log('销售方案表单验证失败！');
            validateResult = false;
          }
        });
        if (validateResult) {
          this.addCustomer();
        }
      },
      // 重置表单
      resetForm(form){
        this.$refs[form].resetFields();
      },
      addCustomer(){
        this.saleStrategyForm.saleStrategies.forEach(value => {
          if (value.startTime != null) {
            // todo:将来转换为timestamp格式
            value.startTime = value.startTime;//new Date(value.startTime.toDateString() + ' 13:30:00');
          }
          if (value.endTime != null) {
            // todo:将来转换为timestamp格式
            value.endTime = value.endTime;//new Date(value.endTime.toDateString() + ' 13:30:00');
          }
        })
        this.customer.saleStrategies = this.saleStrategyForm.saleStrategies;
        this.$axios.post('/foq/customer/add', this.customer)
          .then((response) => {
            this.$message({
              message: '添加客户成功',
              type: 'success'
            });
            this.resetForm('customerForm');
            this.resetForm('saleStrategyForm');
            this.listCustomers();
          }, (error) => {
            console.log(error)
          })
      }
      ,
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        const format = require('date-fns/format');
        return format(new Date(date), "YYYY-MM-DD");
      }
      ,
      expireFormat(row, column)
      {
        var expire = row[column.property];
        return expire == 999999 ? '无限期' : expire;
      }
      ,
      handleSizeChange(val)
      {
        this.pageSize = val
        this.listCustomers()
      }
      ,
      handleCurrentChange(val)
      {
        this.currentPage = val
        this.listCustomers()
      }
      ,
      listCustomers()
      {
        var params = {}
        params.listMode = this.listMode
        params.keyValue = this.keyValue
        params.pageSize = this.pageSize
        params.currentPage = this.currentPage
        this.$store.dispatch('customers/getCustomers', params);
      }
      ,
      listSaleCategories()
      {
        this.$store.dispatch('saleCategories/getSaleCategories');
      }
      ,
      recharged(id, name)
      {
        this.$prompt('请输入金额', '充值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'number'
        }).then(({value}) => {
          let params = new URLSearchParams()
          params.append('id', id)
          params.append('cost', value)
          this.$axios.post('/foq/customer/recharge', params)
            .then((response) => {
              this.listCustomers()
            }, (error) => {
              console.log(error)
            })
          this.$message({
            type: 'success',
            message: `为客户[${name}]充值${value}元成功`
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
      ,
      modifyCustomer(id)
      {
        this.dialogModifyCustomerVisible = true
        this.contentCustomer(id);
      }
      ,
      adjustCost(id)
      {
        this.dialogAdjustCostVisible = true
        this.costAdjust.id = id;
        console.log(this.costAdjust)
        this.$nextTick(function () {
          this.$refs.cost.$el.querySelector('input').focus();
        });
      },
      deleteCustomer(id)
      {
        this.$confirm('此操作将删除客户，一定要慎重。 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = this.$qs.stringify({
            id
          })
          this.$axios.post('/foq/customer/delete', data)
            .then((response) => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.listCustomers();
            }, (error) => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      ,
      // 客户详情
      contentCustomer(id)
      {
        console.log(id);
        this.$axios.get('/foq/customer/content', {
          params: {id}
        })
          .then((response) => {
            this.customerModify = response.data.data
            this.customerStop = response.data.data
            // 必须清空方案数组，否则会key重复
            this.saleStrategyModifyForm.saleStrategies = []
            this.customerModify.saleStrategies.forEach(value => {
              this.saleStrategyModifyForm.saleStrategies.push(value)
            })
            console.log(response.data.data)
          }, (error) => {
            console.log(error)
          })
      }
      ,
      // 确认修改客户
      confirmModifyCustomer()
      {
        this.saleStrategyModifyForm.saleStrategies.forEach(value => {
          if (value.startTime != null) {
            // todo:将来转换为timestamp格式
            value.startTime = value.startTime;//new Date(new Date(value.startTime).toDateString() + ' 13:30:00');
          }
          if (value.endTime != null) {
            // todo:将来转换为timestamp格式
            value.endTime = value.endTime;//new Date(new Date(value.endTime).toDateString() + ' 13:30:00');
          }
        });
        this.customerModify.saleStrategies = this.saleStrategyModifyForm.saleStrategies
        this.$axios.post('/foq/customer/modify', this.customerModify)
          .then((response) => {
            this.$message({
              message: '修改客户信息成功',
              type: 'success'
            });
            this.dialogModifyCustomerVisible = false;
            this.resetForm('customerModifyForm');
            this.listCustomers();
          }, (error) => {
            console.log(error)
          })
      }
      ,
      confirmAdjustCost()
      {
        console.log(this.costAdjust)
        let params = new URLSearchParams()
        params.append('id', this.costAdjust.id)
        params.append('cost', this.costAdjust.cost)
        if (this.costAdjust.description) {
          params.append('description', this.costAdjust.description)
        }
        this.$axios.post('/foq/customer/adjustcost', params)
          .then((response) => {
            this.$message({
              message: '调整费用成功',
              type: 'success'
            });
            this.costAdjust = {}
            this.resetForm('costAdjustForm');
            this.dialogAdjustCostVisible = false;
            this.listCustomers();
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
</script>
<style scoped>
  .el-form {
    text-align: left;
  }

  .el-select {
    width: 100%;
  }

  .el-date-picker {
    width: 100%;
  }

  .el-pagination {
    margin: 10px 0px;
  }

  .el-button {
    margin: auto 0px;
  }

  .el-dialog {
    padding: 0px;
  }

  .modify-customer-wide {
    width: 130px;
  }

  .modify-customer-medium {
    width: 90px;
  }

  .modify-customer-narrow {
    width: 60px;
  }
</style>
