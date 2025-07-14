<template>
  <div class="tree-node">
    <div
      class="tree-node__item"
      :class="{
        'tree-node__item--selected': isSelected,
        'tree-node__item--expanded': isExpanded,
        'tree-node__item--has-children': hasChildren,
      }"
      @click="handleClick"
      @dblclick="handleDblClick"
    >
      <div class="tree-node__content">
        <span
          v-if="hasChildren"
          class="tree-node__expand-icon"
          :class="{ 'tree-node__expand-icon--expanded': isExpanded }"
        >
          ▶
        </span>
        <span class="tree-node__name">{{ node._name }}</span>
      </div>
    </div>

    <div v-if="hasChildren && isExpanded" class="tree-node__children">
      <TreeNode
        v-for="child in children"
        :key="child._nodeId"
        :node="child"
        :level="level + 1"
        @node-click="$emit('node-click', $event)"
        @node-dblclick="$emit('node-dblclick', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

interface TreeNodeProps {
  node: any;
  level: number;
}

const props = defineProps<TreeNodeProps>();
const emit = defineEmits<{
  "node-click": [node: any];
  "node-dblclick": [node: any];
}>();

const store = useStore();

const isSelected = computed(() => {
  return store.state.selectedNodeId === props.node._nodeId;
});

const isExpanded = computed(() => {
  return store.state.expandedNodeIds.includes(props.node._nodeId);
});

const hasChildren = computed(() => {
  return (
    props.node.cat &&
    (Array.isArray(props.node.cat) ? props.node.cat.length > 0 : true)
  );
});

const children = computed(() => {
  if (!props.node.cat) return [];

  if (Array.isArray(props.node.cat)) {
    return props.node.cat;
  } else {
    return [props.node.cat];
  }
});

const handleClick = () => {
  emit("node-click", props.node);
};

const handleDblClick = () => {
  if (hasChildren.value) {
    emit("node-dblclick", props.node);
  }
};
</script>

<style lang="scss" scoped>
.tree-node {
  &__item {
    padding: 0.5rem;
    margin: 0.25rem 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;

    &:hover {
      background: #f8f9fa;
      border-color: #dee2e6;
    }

    &--selected {
      background: #007bff !important;
      color: white;
      border-color: #0056b3;
    }

    &--expanded {
      background: #e9ecef;
    }

    &--has-children {
      font-weight: 500;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__expand-icon {
    font-size: 0.75rem;
    transition: transform 0.2s;

    &--expanded {
      transform: rotate(90deg);
    }
  }

  &__name {
    flex: 1;
  }

  &__children {
    margin-left: 1.5rem;
    border-left: 1px solid #dee2e6;
    padding-left: 1rem;
  }
}
</style>
