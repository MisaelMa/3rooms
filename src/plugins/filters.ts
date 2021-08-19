import Vue from 'vue';
import moment from 'moment';

Vue.filter('shortDate', (date: Date) => {
    if (!date) {
        return 'SIN ESPECIFICAR';
    }
    return moment(date).locale('es').format('DD/MMMM/YYYY');
});