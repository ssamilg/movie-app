<script>
import Datatable from '@/components/Datatable.vue';

export default {
  name: 'Home',
  components: {
    Datatable,
  },
  data() {
    return {
      table: {
        items: [
          {
            id: 0, name: 'John', age: '24', job: 'engineer',
          },
          {
            id: 1, name: 'John', age: '24', job: 'engineer',
          },
          {
            id: 2, name: 'John', age: '24', job: 'engineer',
          },
        ],
        headers: ['name', 'age', 'job'],
      },
    };
  },
};
</script>

<template>
  <div id="home">
    <div class="main-wrapper">
      <div class="layout title-section">
        Movie App
      </div>

      <div class="layout">
        <div class="search-input-section">
          <div class="ui massive fluid icon input">
            <input type="text" placeholder="Search for a movie...">
            <i class="search icon"></i>
          </div>
        </div>
      </div>

      <div class="layout">
        <div class="results-table">
          <datatable
            :headers="table.headers"
            :items="table.items"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#home {
  height: 100%;
  padding: 16px;
  background-color: #DACFF2;

  .layout {
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: center;
  }

  .fill-height {
    height: 100%;
  }

  .main-wrapper {
    height: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: rgba($color: #FFFFFF, $alpha: .7);

    .title-section {
      font-weight: 600;
      font-size: 24px;
    }

    .search-input-section {
      width: 80%;
    }

    .results-table {
      width: 80%;
    }
  }
}
</style>
