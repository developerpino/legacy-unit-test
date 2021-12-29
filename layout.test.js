const layout = require('./layout');
global.pageDATA = require('./mock.pageData');

test('is loaded', () => {
    expect(layout.init).toBeDefined();
    expect(layout.atMenuID).toBeDefined();
});

document.body.innerHTML = `
<div id='gnb'></div>
<div id='snb'></div>
<div id='gnb_title_gnb_parent'></div>
<div id='snb_title_gnb_child'></div>
`;
describe('exec init', () => {
    const fixResize = $.fn.fixResize = jest.fn();
    const cookie = $.cookie = jest.fn();

    layout.init();
    test('atGNBMenuID', () => {
        expect(layout.atGNBMenuID).toEqual('gnb_parent');
    });
    test('atSNBMenuID', () => {
        expect(layout.atSNBMenuID).toEqual('gnb_child');
    });
    test('#gnb ', () => {
        expect(document.getElementById('gnb').innerHTML.length).toEqual(447);
    });
    test('#snb', () => {
        expect(document.getElementById('snb').innerHTML.length).toEqual(168);
    });
    test('called fixResize', () => {
        expect(fixResize.mock.calls.length).toEqual(1);
    });
    test('called cookie', () => {
        expect(cookie.mock.calls.length).toEqual(1);
    });
    test('changed dom', () => {
        expect(document.getElementById('gnb_title_gnb_parent').style.background).toEqual('rgb(93, 177, 241)');
        expect(document.getElementById('snb_title_gnb_child').classList[0]).toEqual('selected');
    });
});
