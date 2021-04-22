<script>
import Datatable from '@/components/Datatable.vue';
import Snackbar from '@/components/Snackbar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Snackbar,
    Datatable,
  },
  data() {
    return {
      isLoading: false,
      isInitialized: false,
      searchText: '',
      table: {
        items: [],
        headers: [],
      },
      snackbar: {
        isVisible: false,
        text: 'An error occured...',
        type: 'error',
      },
    };
  },
  methods: {
    ...mapActions(['search']),
    searchInputChange() {
      if (this.searchText === '') {
        this.isInitialized = false;
      } else {
        this.searchMovie();
      }
    },
    searchMovie() {
      this.isLoading = true;

      const params = {
        apikey: '1664b7e',
        s: this.searchText,
      };

      this.search(params)
        .then(({ data }) => {
          if (data.Search) {
            this.table.items = data.Search;
            this.table.headers = Object.keys(data.Search[0]).filter((h) => h !== 'imdbID');
          } else if (data.Error) {
            this.snackbar = {
              isVisible: true,
              type: 'error',
              text: data.Error,
            };
          }
        })
        .catch(() => {
          this.snackbar.isVisible = true;
        })
        .finally(() => {
          this.isLoading = false;
          this.isInitialized = true;
        });
    },
  },
};
</script>

<template>
  <div id="home">
    <div class="main-wrapper">
      <div class="search-section">
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
                @keyup.enter="searchInputChange"
              >
              <i class="search icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isInitialized" class="layout table-wrapper">
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

    <snackbar
      v-if="snackbar.isVisible"
      :text="snackbar.text"
      :type="snackbar.type"
      @close="snackbar.isVisible = false"
    />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background-color: rgba($color: #FFFFFF, $alpha: .7);

    .title-section {
      font-weight: 600;
      font-size: 48px;
      padding-bottom: 32px;
    }

    .search-section {
      width: 80%;

      .search-input-section {
        width: 80%;
      }
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
