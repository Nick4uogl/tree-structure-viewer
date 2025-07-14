<template>
  <div class="selected-list">
    <h3 class="selected-list__title">Selected Items</h3>

    <div v-if="selectedItems.length === 0" class="selected-list__empty">
      No items selected
    </div>

    <div v-else class="selected-list__items">
      <div
        v-for="item in selectedItems"
        :key="item._nodeId"
        class="selected-list__item"
      >
        <span class="selected-list__item-name">{{ item._name }}</span>
        <button
          class="selected-list__item-remove"
          @click="removeItem(item._nodeId)"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const selectedItems = computed(() => store.state.selectedList);

const removeItem = (nodeId: string) => {
  store.commit("removeFromSelectedList", nodeId);
};
</script>

<style lang="scss" scoped>
.selected-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  background: #fff;
  height: fit-content;

  &__title {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
  }

  &__empty {
    color: #6c757d;
    font-style: italic;
    text-align: center;
    padding: 1rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #dee2e6;

    &:hover {
      background: #e9ecef;
    }
  }

  &__item-name {
    flex: 1;
    font-size: 0.9rem;
  }

  &__item-remove {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    flex: 0 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: #c82333;
    }
  }
}
</style>
