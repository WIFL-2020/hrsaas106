<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartment" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartment } from '@/api/department'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: {}
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
