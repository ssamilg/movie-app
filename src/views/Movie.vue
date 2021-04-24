<script>
import { mapActions } from 'vuex';

export default {
  name: 'Movie',
  data() {
    return {
      movieId: '',
      movieData: {},
      isLoading: true,
    };
  },
  created() {
    this.getIdFromQuery();
    this.getMovieDetails();
  },
  methods: {
    ...mapActions(['fetchMovieData']),
    getIdFromQuery() {
      this.movieId = this.$route.query.id;
    },
    getMovieDetails() {
      const params = {
        apikey: '1664b7e',
        i: this.movieId,
        plot: 'full',
      };

      this.fetchMovieData(params)
        .then(({ data }) => {
          this.movieData = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    routeBack() {
      this.$router.push('/');
    },
    ratingClass(rating) {
      console.log(rating);
      let ratingClass = 'ratings-good';
      const [rateValue] = rating.split('');
      console.log(rateValue);

      if (rateValue > 7) {
        ratingClass = 'ratings-good';
      } else if (rateValue < 7 && rateValue > 4) {
        ratingClass = 'ratings-medium';
      } else if (rateValue < 4) {
        ratingClass = 'ratings-bad';
      }

      return ratingClass;
    },
  },
};
</script>

<template>
  <div id="movie-view">
    <div v-if="!isLoading" class="main-wrapper">
      <div class="layout header-section">
        <div class="title">
          {{ movieData.Title }}
        </div>

        <div class="ui animated button back-btn" tabindex="0" @click="routeBack">
          <div class="visible content">Back to search</div>
          <div class="hidden content">
            <i class="left arrow icon"/>
          </div>
        </div>
      </div>

      <div class="layout info-section">
        <div class="ratings">
          <div :class="ratingClass(movieData.imdbRating)">
            imdb: {{ movieData.imdbRating }}
          </div>

          <div :class="ratingClass(movieData.Metascore)">
            Metascore: {{ movieData.imdbRating }}
          </div>
        </div>
        <!-- {{ movieData }} -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#movie-view {
  height: 100%;
  padding: 16px;
  background-color: #DACFF2;

  .main-wrapper {
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 16px;
    background-color: rgba($color: #FFFFFF, $alpha: .7);

    .header-section{
      justify-content: flex-start;
      align-items: center;

      .title {
        width: 90%;
        font-size: 36px;
        font-weight: 700;
      }

      .back-btn {
        background-color: #F2711C;
        color: white;
        font-weight: 500;
      }
    }

    .info-section {
      height: 90%;
      justify-content: flex-start;

      .ratings {
        &-good {
          color: #1c9c3a;
        }

        &-medium {
          color: #dda703;
        }

        &-bad {
          color: #c02121;
        }
      }
    }
  }
}
</style>
