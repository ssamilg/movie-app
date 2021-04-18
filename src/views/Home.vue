<script>
import Datatable from '@/components/Datatable.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Datatable,
  },
  data() {
    return {
      isLoading: false,
      searchText: '',
      table: {
        items: [],
        headers: [],
      },
    };
  },
  methods: {
    ...mapActions(['search']),
    searchMovie() {
      this.isLoading = true;

      const params = {
        apikey: '1664b7e',
        s: this.searchText,
      };

      this.search(params)
        .then(({ data }) => {
          console.log(data);
          this.table.items = data.Search;
          this.table.headers = Object.keys(data.Search[0]);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
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
            <input
              v-model="searchText"
              type="text"
              placeholder="Search for a movie..."
              @keyup.enter="searchMovie"
            >
            <i class="search icon"></i>
          </div>
        </div>
      </div>

      <div class="layout table-wrapper">
        <div v-if="isLoading" class="table-loader">
          <div class="ui segment fill-height">
            <div class="ui active inverted dimmer">
              <div class="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        </div>

        <div v-else class="results-table">
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

    .table-wrapper {
      height: 80%;
      overflow: hidden;

      .results-table {
        width: 95%;
        overflow: auto;
      }

      .table-loader {
        height: 100%;
        width: 95%;
      }
    }
  }
}
</style>
