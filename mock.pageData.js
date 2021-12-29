module.exports = {
    scriptURL: 'staff_jest.com',
    gnbJSON: JSON.stringify([
        {
            is_use: 1,
            src: 'staff_jest.com',
            menu_id: 'gnb_parent',
            child: [
                {
                    is_use: 1,
                    src: 'staff_jest.com',
                    menu_id: 'gnb_child'
                }
            ],
        }
    ]),
    snbJSON: JSON.stringify([
        {
            is_use: 2,
            src: 'www.com',
            menu_id: 'snb_parent',
            child: [
                {
                    is_use: 1,
                    src: 'staff_jest.com',
                    menu_id: 'gnb_child'
                }
            ],
        }
    ]),
};