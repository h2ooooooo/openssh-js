import DefaultTheme from 'vitepress/theme';
import {h} from 'vue';
import ProjectFooter from './ProjectFooter.js';
import './style.css';

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(ProjectFooter),
        });
    },
};
