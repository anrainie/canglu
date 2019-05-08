define(['vueLoader'], (loader) => {
    return {
        data() {
            return {
                options: [{
                    value: '0',
                    label: '无'
                }, {
                    value: '1',
                    label: '慢速'
                }, {
                    value: '2',
                    label: '中速'
                }, {
                    value: '3',
                    label: '快速'
                }],
            };
        },
        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                },
            },
            config: {
                type: Object,
                default: {}
            }
        },
        mounted() {
        },
        components: {},
        computed: {},
        methods: {}
    }
});