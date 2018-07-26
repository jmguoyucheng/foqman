<template>
  <div id="add">
    <el-form :inline="true" :model="saleCategory" :rules="rules" ref="saleCategoryForm">
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入商品名称" v-model="saleCategory.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="submitForm('saleCategoryForm')">添加</el-button>
        <el-button icon="el-icon-setting" @click="resetForm('saleCategoryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="saleCategories"
      stripe
      border>
      <el-table-column
        prop="id"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" icon="el-icon-edit" @click="modifySaleCategory(scope.row.id)">修改




          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteSaleCategory(scope.row.id)">删除





          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ElContainer from "../../../../node_modules/element-ui/packages/container/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form";
  import {mapGetters} from 'vuex'
  export default {
    components: {ElForm, ElRow, ElContainer},
    data(){
      return {
        saleCategory: {},
        rules: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created()
    {
      this.listSaleCategories();
    },
    computed: mapGetters({
      saleCategories: 'saleCategories/saleCategories'
    }),
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSaleCategory();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSizeChange(val)
      {
        this.pageSize = val
        this.listSaleCategories()
      },
      handleCurrentChange(val)
      {
        this.currentPage = val
        this.listSaleCategories()
      },
      listSaleCategories()
      {
        this.$store.dispatch('saleCategories/getSaleCategories');
      },
      addSaleCategory()
      {
        this.$axios.post('/foq/salecategory/add', this.saleCategory)
          .then((response) => {
            this.$message({
              message: '添加商品种类成功',
              type: 'success'
            });
            this.resetForm('saleCategoryForm');
            this.listSaleCategories();
          }, (error) => {
            console.log(error)
          })
      },
      modifySaleCategory(id){
        this.$message.error('该功能尚未开发');
      },
      deleteSaleCategory(id){
        this.$confirm('此操作将删除商品种类及其销售方案，并删除客户的该类销售方案，一定要慎重。 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = this.$qs.stringify({
            id
          })
          this.$axios.post('/foq/salecategory/delete', data)
            .then((response) => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.listSaleCategories();
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
