<script>
import Datatable from '@/components/Datatable.vue';
import Snackbar from '@/components/Snackbar.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Snackbar,
    Datatable,
  },
  data() {
    return {
      isInitialized: false,
      searchText: '',
      table: {
        items: [],
        headers: [],
      },
    };
  },
  computed: {
    ...mapState(['snackbarData', 'searchResults', 'isLoading']),
  },
  mounted() {
    if (this.searchResults) {
      this.setTableDatas();
      this.isInitialized = true;
    }
  },
  methods: {
    ...mapActions(['fetchMovieData', 'showSnackbar']),
    searchInputChange() {
      if (this.searchText === '') {
        this.isInitialized = false;
      } else {
        this.searchMovie();
      }
    },
    searchMovie() {
      const params = {
        apikey: '1664b7e',
        s: this.searchText,
      };

      this.fetchMovieData(params)
        .then(() => {
          this.setTableDatas();
        })
        .catch((err) => {
          this.showSnackbar(err, 'error');
        })
        .finally(() => {
          this.isInitialized = true;
        });
    },
    setTableDatas() {
      this.table.items = this.searchResults.Search;
      this.table.headers = Object.keys(this.searchResults.Search[0]).filter((h) => h !== 'imdbID');
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
                placeholder="Search for a movie by title..."
                @keyup.enter="searchInputChange"
              >
              <i class="search icon"/>
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
      v-if="snackbarData.isVisible"
      :text="snackbarData.text"
      :type="snackbarData.type"
      @close="snackbarData.isVisible = false"
    />
  </div>
</template>

<style lang="scss">
.layout {
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
}

.fill-height {
  height: 100%;
}

#home {
  height: 100%;
  padding: 16px;
  background-color: #DACFF2;

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
