<script>
import { mapActions, mapState } from 'vuex';
import Datatable from '@/components/Datatable.vue';
import Snackbar from '@/components/Snackbar.vue';

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
      year: '2021',
    };
  },
  computed: {
    ...mapState(['snackbarData', 'searchResults', 'isLoading', 'isErrored']),
  },
  mounted() {
    if (this.searchResults.items.length) {
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
        s: this.searchText,
        y: this.year,
      };

      this.fetchMovieData(params)
        .catch((err) => {
          console.log(err);
          this.showSnackbar(err, 'error');
        })
        .finally(() => {
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
                placeholder="Search for a movie by title..."
                @keyup.enter="searchInputChange"
              >
              <i class="search icon"/>
            </div>
          </div>

          <div class="date-input-section">
            <div class="ui massive fluid icon input">
              <input v-model="year" type="text" placeholder="Year">
              <i class="calendar icon"/>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isInitialized && !isErrored" class="layout table-wrapper">
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
            :headers="searchResults.headers"
            :items="searchResults.items"
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
        width: 70%;
      }
      .date-input-section {
        width: 30%;
        padding-left: 8px;
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
