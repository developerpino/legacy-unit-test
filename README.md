# Use jest on legacy
jquery legacy project 에 unit test framework 중 jest 적용

https://jestjs.io/

[Jest_survay](./survay_2021.PNG)

## Install jest by global
```
npm install jest --global
```
## Execute jest
```
D:\workspace\legacy-unit-test>jest
Error: Could not find a config file based on provided values:
path: "D:\workspace\legacy-unit-test"
```
Complete!

## jest.config.js
```
module.exports = {
    testEnvironment : 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
};
```

## Targets
- layout.js
- create.js

## layout.js
```
 const layoutJS = {
     init : function () {
         this.bindEvents();
     },
     atGNBMenuID : '',
     atSNBMenuID : '',
     atMenuID : '',
     atResetUrl : '',
     bindEvents : function () {
         this.gridGNB();
         this.gridSNB();
         if (this.atGNBMenuID.length > 0) {
             $('#gnb_title_' + this.atGNBMenuID).css('background', '#5db1f1');
         }
         $('#eMultiTable').fixResize({colResize: true, resizeVer: 'flex'});
         let locale = 'ko_KR';
        if ($.cookie('locale') !== undefined) {
            locale = $.cookie('locale');
        }
     },
     gridGNB : function () {
     },
     gridSNB : function () {
     },
 };
 $(document).ready(function () {
     layoutJS.init();
 });
```
## Goals
1. init() 실행 시 bindEvents() 실행
2. gridGNB() 정상 동작
3. gridSNB() 정상 동작
4. this.atGNBMenuID.length > 0 충족하여 $('#gnb_title_' + this.atGNBMenuID) 의 background 가 바뀌는지 여부
