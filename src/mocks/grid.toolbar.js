// noinspection JSUnusedGlobalSymbols
export const GRID_TOOLBAR = [
    {
        items: [
            {
                text: 'Create',
                url: 'create',
                options: { 'data-toggle': 'modal', 'data-target': '#modal-form' }
            },
            {
                text: 'Update',
                url: 'update',
                disabled: true
            }
        ]
    },
    {
        items: [
            {
                html: '<i class="mdi mdi-dots-horizontal"></i>',
                url: '#',
                menu: {
                    type: 'dropdown',
                    items: [
                        { url: '#', label: 'Refresh' }
                    ]
                }
            }
        ]
    }
];
