'use strict'

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
         if (this.atSNBMenuID.length > 0) {
             $('#snb_title_' + this.atSNBMenuID).toggleClass('selected');
         }
         if (this.atMenuID.length > 0) {
             $('#snb_' + this.atMenuID).toggleClass('selected');
         }
         $('#eMultiTable').fixResize({colResize: true, resizeVer: 'flex'});
         let locale = 'ko_KR';
         if ($.cookie('locale') !== undefined) {
             locale = $.cookie('locale');
         }
         $('select[name="locale"]').val(locale);
     },
 
     gridGNB : function () {
         let gnbDATA = JSON.parse(pageDATA.gnbJSON);
         let gnbHTML = '';
         if ( typeof gnbDATA==='object' ) {
             $.each(gnbDATA, (k,v)=>{
                 if ( v.is_use===1 ) {
                     if ( v.src === pageDATA.scriptURL ) {
                         this.atGNBMenuID = v.menu_id;
                     }
                     gnbHTML += '<li>';
                     gnbHTML += '    <strong class="title" id="gnb_title_'+v.menu_id+'">'+ __(v.name) +' <button type="button" class="btnCover eOpenMenu">'+ __('메뉴 펼치기') +'</button></strong>';
                     gnbHTML += '    <div class="gScroll">';
                     gnbHTML += '        <div class="mNavigation typeLayer">';
                     gnbHTML += '            <ul class="depth3">';
                     if ( typeof v.child==='object' ) {
                         $.each(v.child, (kk,vv)=>{
                             if ( vv.is_use===1 ) {
                                 if ( vv.src === pageDATA.scriptURL ) {
                                     this.atGNBMenuID = v.menu_id;
                                     this.atSNBMenuID = vv.menu_id;
                                 }
                                 gnbHTML += '        <li>';
                                 if ( vv.open_type===2 ) {
                                 } else {
                                     let location  = vv.location===null ? '#' : vv.location;
                                     gnbHTML += '<div class="menu"><a href="'+location+'">'+ __(vv.name) +'</a></div>';
                                 }
                                 gnbHTML += '            <ul class="depth4">';
                                 if ( typeof vv.child==='object' ) {
                                     $.each(vv.child, (kkk, vvv) => {
                                         if ( vvv.is_use===1 ) {
                                             let target = vvv.open_type===2 ? '_blank' : '';
 
                                             if ( vvv.src === pageDATA.scriptURL ) {
                                                 this.atGNBMenuID = v.menu_id;
                                                 this.atSNBMenuID = vv.menu_id;
                                                 this.atMenuID = vvv.menu_id;
                                                 this.atResetUrl = vvv.location;
                                             }
                                             if ( vvv.open_type===2 ) {
                                                 let className = 'translationPopup';
                                                 if ( vvv.name === '주문 처리') {
                                                     className = 'csOrderProcessingPopup';
                                                 }
                                                 gnbHTML += '<li><a href="#" class="' + className + '" data-popup="' + vvv.src + '">' + __(vvv.name) + '</a></li>';
                                             } else {
                                                 gnbHTML += '<li><a href="' + vvv.location + '">' + __(vvv.name) + '</a></li>';
                                             }
                                         }
                                     });
                                 }
                                 gnbHTML += '            </ul>';
                                 gnbHTML += '        </li>';
                             }
                         });
                     }
                     gnbHTML += '            </ul>';
                     gnbHTML += '        </div>';
                     gnbHTML += '    </div>';
                     gnbHTML += '    <span class="edge"></span>';
                     gnbHTML += '</li>';
                 }
             });
         }
 
         $('#gnb').html(gnbHTML);
     },
 
     gridSNB : function () {
         let snbDATA = JSON.parse(pageDATA.snbJSON);
         let snbHTML = '';
 
         if ( typeof snbDATA==='object' && snbDATA.length>0 && typeof snbDATA[0].child==='object' ) {
             $.each(snbDATA[0].child, (k,v)=>{
                 if ( v.is_use===1 ) {
                     snbHTML += '<div class="category">';
                     snbHTML += '    <a href="#none" class="link collapsible" id="snb_title_'+v.menu_id+'"><strong>'+ __(v.name) +'</strong></a>';
                     snbHTML += '        <ul class="depth3">';
                     if ( typeof v.child==='object' ) {
                         $.each(v.child, (kk,vv)=>{
                             if ( vv.is_use===1 ) {
                                 snbHTML += '    <li>';
                                 if ( vv.open_type===2 ) {
                                     let className = 'translationPopup';
                                     if ( vv.name === '주문 처리') {
                                         className = 'csOrderProcessingPopup';
                                     }
                                     snbHTML += '<a href="#" class="link '+className+'" data-popup="'+vv.src+'" id="snb_'+vv.menu_id+'">'+ __(vv.name) +'</a>';
                                 } else {
                                     snbHTML += '<a href="'+vv.location+'" class="link" id="snb_'+vv.menu_id+'">'+ __(vv.name) +'</a>';
                                 }
                                 snbHTML += '        <ul class="depth4">';
                                 if ( typeof vv.child==='object' ) {
                                     $.each(vv.child, (kkk, vvv) => {
                                         if ( vvv.is_use===1 ) {
                                             if ( vvv.open_type===2 ) {
                                                 snbHTML += '<li><a href="#" data-popup="'+vvv.src+'" class="link translationPopup">' + __(vvv.name) + '</a></li>';
                                             } else {
                                                 snbHTML += '<li><a href="'+vvv.src+'" class="link">' + __(vvv.name) + '</a></li>';
                                             }
                                         }
                                     });
                                 }
                                 snbHTML += '        </ul>';
                                 snbHTML += '    </li>';
                             }
                         });
                     }
                     snbHTML += '        </ul>';
                     snbHTML += '</div>';
                 }
             });
 
             $('#snb').html(snbHTML);
         }
         // $('#snb').html(snbHTML);
     },
 };
 
 $(document).ready(function () {
     layoutJS.init();
 });
 
 if ( typeof module === "object" && typeof module.exports === "object" ) {
     module.exports = layoutJS;
 }