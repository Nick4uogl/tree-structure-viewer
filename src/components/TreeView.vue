<template>
  <div class="tree">
    <div class="tree__controls">
      <button class="tree__control tree__control--expand" @click="expandAll">
        Expand All
      </button>
      <button
        class="tree__control tree__control--collapse"
        @click="collapseAll"
      >
        Collapse All
      </button>
    </div>

    <div class="tree__container">
      <TreeNode
        v-if="treeData"
        :node="treeData"
        :level="0"
        @node-click="handleNodeClick"
        @node-dblclick="handleNodeDblClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TreeNode from "./TreeNode.vue";
import treeDataJson from "../../data.json";
import type { DataJson } from "../types/tree";

const store = useStore();

const treeData = computed(() => store.state.tree);

onMounted(() => {
  // Завантажуємо дерево з data.json
  store.commit("setTree", (treeDataJson as DataJson).tree.cat);

  // Ініціалізуємо стан з localStorage
  store.dispatch("initializeState");

  // Якщо немає збереженого виділеного елемента, встановлюємо батьківський
  if (
    !store.state.selectedNodeId &&
    (treeDataJson as DataJson).tree.cat &&
    (treeDataJson as DataJson).tree.cat._nodeId
  ) {
    store.commit(
      "setSelectedNodeId",
      (treeDataJson as DataJson).tree.cat._nodeId
    );
    store.commit("setExpandedNodeIds", [
      (treeDataJson as DataJson).tree.cat._nodeId,
    ]);
  }
});

const handleNodeClick = (node: any) => {
  store.commit("setSelectedNodeId", node._nodeId);
  store.commit("addToSelectedList", node);
};

const handleNodeDblClick = (node: any) => {
  const expandedIds = [...store.state.expandedNodeIds];
  const nodeId = node._nodeId;

  if (expandedIds.includes(nodeId)) {
    // Згортаємо
    store.commit(
      "setExpandedNodeIds",
      expandedIds.filter((id) => id !== nodeId)
    );
  } else {
    // Розгортаємо
    store.commit("setExpandedNodeIds", [...expandedIds, nodeId]);
  }
};

const expandAll = () => {
  // Рекурсивно збираємо всі id елементів
  const getAllNodeIds = (node: any): string[] => {
    const ids = [node._nodeId];
    if (node.cat) {
      if (Array.isArray(node.cat)) {
        node.cat.forEach((child: any) => {
          ids.push(...getAllNodeIds(child));
        });
      } else {
        ids.push(...getAllNodeIds(node.cat));
      }
    }
    return ids;
  };

  if (treeData.value) {
    const allIds = getAllNodeIds(treeData.value);
    store.commit("setExpandedNodeIds", allIds);
  }
};

const collapseAll = () => {
  store.commit("setExpandedNodeIds", []);
};
</script>

<style lang="scss" scoped>
.tree {
  &__controls {
    margin-bottom: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  &__control {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f5f5f5;
    }

    &--expand {
      color: #28a745;
    }

    &--collapse {
      color: #dc3545;
    }
  }

  &__container {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    background: #fff;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
}
</style>
