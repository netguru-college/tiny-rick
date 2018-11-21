import Vue from 'vue';
import formatDistance from 'date-fns/distance_in_words_to_now';

Vue.filter('time-ago', function (value) {
  if (!value) return '-';
  return formatDistance(new Date(value), { addSuffix: true });
});
