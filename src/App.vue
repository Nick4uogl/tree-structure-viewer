<script setup lang="ts">
import TreeView from "./components/TreeView.vue";
import SelectedList from "./components/SelectedList.vue";
</script>

<template>
  <div class="app">
    <main class="app__main">
      <div class="app__content">
        <section class="app__tree-section">
          <TreeView />
        </section>

        <section class="app__list-section">
          <SelectedList />
        </section>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: #f8f9fa;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    background: #fff;
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }

  &__main {
    flex: 1;
    padding: 2rem;
  }

  &__content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    height: calc(100vh - 120px);
  }

  &__tree-section {
    min-height: 0;
  }

  &__list-section {
    min-height: 0;
  }
}

@media (max-width: 768px) {
  .app {
    &__content {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    &__main {
      padding: 1rem;
    }
  }
}
</style>
