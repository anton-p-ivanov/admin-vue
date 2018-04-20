// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Alert',
    methods: {
        close: function (event) {
            let target = event.target;

            while (target !== document) {
                if (target.classList.contains('alert')) {
                    target.parentNode.removeChild(target);
                    break
                }
                target = target.parentNode
            }
        }
    }
}