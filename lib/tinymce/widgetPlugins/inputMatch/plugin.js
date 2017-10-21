/**
 * Created by a56832357 on 17/5/22.
 */
tinymce.PluginManager.add('inputMatch',function(editor){
    var id = "inputMacth";
    // console.log("ok");
    editor.addButton("inputMatch",{
        icon: 'inputMatch',
        tooltip: '输入匹配',
        image : '/lib/tinymce/widgetPlugins/imageupload/img/icon-inputMatch.png',
        onClick:showDialog
    });

    function getTemplatesFn(id,e){
        var values = e.data;
        if(e.data.data ){
            values = e.data.data;
        }
        var htmlArr = [];
        for(var i = 0; i < values.length; i++) {
            var value = values[i] ;
            var divHtml =
                '<div class="items-warp">' +
                '	<div class = "deleteIcon">+</div>' +
                '	<a data-src="'+ value.mappingId +'" href="'+ value.couponPromoteUrl + '">' +
                '<span data="' + value.buyUrl + '" class="items-holder">' +
                '<img class="items-img" src="'+ value.imageUrl +'">' +
                '<span class="content-holder">'+
                '<span class="item-title">' + value.title + '</span>'+
                '<span class="item-afterPrice">券后价</span>'+
                '<span class="item-price">￥' + value.currentPrice + '</span>'+
                '<span class="original-price">¥' + value.originalPrice + '</span>' +
                '</span>'+
                '<span class="right-btn">购买</span>'+
                '</span>' +
                '</a>' +
                '</div>' +
                // '<p></p>' +
                '';
            htmlArr.push(divHtml);
        }
        htmlArr.push("<p></p>");
        return htmlArr.join('');
    };

    function coAsync(editor,e){
        var divHtml = getTemplatesFn(id,e);
        editor.insertContent(divHtml);
        editor.windowManager.close();
        tinymce.activeEditor.focus();
        var items = tinymce.activeEditor.dom.select(".items-warp");
        for(var i = 0; i < items.length; i++){
            (function(i){
                // console.log(items[i]);
                items[i].getElementsByClassName("deleteIcon")[0].onclick = function(){
                    items[i].parentNode.removeChild( items[i] );
                }
                items[i].getElementsByTagName("a")[0].onclick = function(){
                    return false;
                }
            })(i)
        }
        tinymce.activeEditor.focus();
    };

    function getTemplatesFnRecommendList(id, e){
        var values = e.data;
        if(e.data.data ){
            values = e.data.data;
        }
        var htmlArr = [];
        for(var i = 0; i < values.length; i++) {
            var value = values[i];
            var discount = Math.round( ( ( ( value.currentPrice - 0 )/ ( value.originalPrice - 0 ) ) * 10 ) * 100 ) / 100 ;
            var divHtml =
                '<div class="items-warp">' +
                '	<div class = "deleteIcon">+</div>' +
                '	<a data-id="'+ value.id +'" href="'+ value.buyUrl + '">' +
                '<span data="' + value.buyUrl + '" class="items-holder">' +
                '<img class="items-img" src="'+ value.itemImages[0] +'">' +
                '<span class="content-holder">'+
                '<span class="item-title">' + value.itemTitle + '</span>'+
                '<span class="item-price">￥' + value.currentPrice + '</span>'+
                '<span class="original-price">¥' + value.originalPrice + '</span>' +
                '<span class = "discount">' + discount + '折' + '</span>' +
                '</span>'+
                '<span class="right-btn">购买</span>'+
                '</span>' +
                '</a>' +
                '</div>' +
                // '<p></p>' +
                '';
            htmlArr.push(divHtml);
        }
        htmlArr.push("<p></p>");

        return htmlArr.join('');
    };

    function coAsyncRecommendList(editor, e) {
        var divHtml = getTemplatesFnRecommendList(id,e);
        editor.insertContent(divHtml);
        editor.windowManager.close();
        //添加删除按钮
        tinymce.activeEditor.focus();
        var items = tinymce.activeEditor.dom.select(".items-warp");
        for(var i = 0; i < items.length; i++){
            (function(i){
                console.log(items[i]);
                items[i].getElementsByClassName("deleteIcon")[0].onclick = function(){
                    items[i].parentNode.removeChild( items[i] );
                }
                items[i].getElementsByTagName("a")[0].onclick = function(){
                    return false;
                }
            })(i)
        }
        tinymce.activeEditor.focus();
    };

    function showStr(str,length) {
        if(!str) {
            return '';
        }
        if(str.length > length) {
            return str.slice(0,length) + '...';
        } else {
            return str;
        }
    };

    function getDatas(editor,e) {
        return {
            next : function(){
                // console.log("``````");
                // console.log(e);
                // console.log(editor);
                var items = e.data;
                if(editor.getParams.itemType == 2) {
                    welfareItemData(items);
                } else if (editor.getParams.itemType == 1) {
                    recommendListData(items);
                }
            },
            reject : function(){
                alert('即将关闭');
            }
        }
    };

    /*福利购商品*/
    function welfareItemData(items) {
        var page = editor.getParams.page || 1;
        var arr = [];
        for(var i = 0; i<items.pageItems.length; i++) {
            var item = items.pageItems[i];
            arr.push({
                name: 'ids-' + i,
                type: 'checkbox',
                checked: false,
                size: 100,
                label:  item.wellItemId +' ---- '+showStr(item.title, 40),
            });
        }

        var pageBox = {
            type:'container',
            name:'page',
            html:'' +
            '<span style="cursor:pointer;" class="mce-pagePrev">上一页</span>' +
            '<span style="margin-left:10px;" class="mce-currentPage">' + page + '</span>' +
            '<span style="margin-left:10px;cursor: pointer;" class="mce-pageNext">下一页</span>' +
            '<span style="margin-left:10px;" >共'+ items.totalPage +'页</span>' +
            '<span style="display: none;" class="mce-totalPage">'+ items.totalPage +'</span>' +
            '<input style="margin-left:40px;width:60px;" value="' + page + '" type="number" class="mce-number" min="1" max="'+items.totalPage+'">' +
            '<span style="margin-left:10px; cursor:pointer;" class="mce-pageJump">跳转</span>',
            onclick: function(e) {
                // console.log(e);
                var body = e.target.offsetParent;
                var currentPage = parseInt($(body).find('.mce-currentPage')[0].innerHTML);
                var totalPage = parseInt($(body).find('.mce-totalPage')[0].innerHTML);
                var jumpPage = parseInt($(body).find('.mce-number')[0].value);

                if(e.target.className == 'mce-pagePrev') {

                    if( currentPage <= 1) {
                        return;
                    } else {
                        // console.log("上一页");
                        // console.log(e);
                        currentPage -=1;
                        editor.getParams.page = currentPage;
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                } else if (e.target.className == 'mce-pageNext'){

                    if(currentPage >= totalPage) {
                        return;
                    } else {
                        // console.log(currentPage);
                        // console.log(totalPage);
                        currentPage +=1;
                        // console.log("下一页");
                        editor.getParams.page = currentPage;
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                } else if(e.target.className == 'mce-pageJump') {
                    if(jumpPage > totalPage || jumpPage < 1) {
                        return;
                    } else {
                        // console.log("跳转");
                        editor.getParams.page = jumpPage;
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                }
            }
        };

        arr.push(pageBox);
        editor.windowManager.open({
            title: '输入匹配',
            body: arr,
            // [
            //     {
            //         name: 'ids0',
            //         type: 'checkbox',
            //         checked: false,
            //         size: 100,
            //         label: '16070 ' + ' ' + ' 商品商品商品',
            //     }
            // ],

            onSubmit: function(e) {
                // editor.settings.matchItem.getitemdetailCallback(e,coAsync(editor,e));
                // alert("插入");
                // console.log(e);
                var checkArr = {
                    data: []
                };
                // console.log(e);
                for(var key in e.data){
                    var index = key.slice(4);
                    if(e.data[key]) {
                        checkArr.data.push(items.pageItems[index])
                    }
                }
                // console.log("checkArr");
                // console.log(checkArr);
                coAsync(editor, checkArr);
            }
        })
    };

    /*好物商品*/
    function recommendListData(items) {
        var page = editor.getParams.page || 1;
        var arr = [];
        for(var i = 0; i<items.pageItems.length; i++) {
            var item = items.pageItems[i];
            arr.push({
                name: 'ids-' + i,
                type: 'checkbox',
                checked: false,
                size: 100,
                label:  item.id+' ---- '+showStr(item.itemTitle, 40),
            });
        }

        var pageBox = {
            type:'container',
            name:'page',
            html:'' +
            '<span style="cursor:pointer;" class="mce-pagePrev">上一页</span>' +
            '<span style="margin-left:10px;" class="mce-currentPage">' + page + '</span>' +
            '<span style="margin-left:10px;cursor: pointer;" class="mce-pageNext">下一页</span>' +
            '<span style="margin-left:10px;" >共'+ items.totalPage +'页</span>' +
            '<span style="display: none;" class="mce-totalPage">'+ items.totalPage +'</span>' +
            '<input style="margin-left:40px;width:60px;" value="' + page + '" type="number" class="mce-number" min="1" max="'+items.totalPage+'">' +
            '<span style="margin-left:10px; cursor:pointer;" class="mce-pageJump">跳转</span>',
            onclick: function(e) {
                // console.log(e);
                var body = e.target.offsetParent;
                var currentPage = parseInt($(body).find('.mce-currentPage')[0].innerHTML);
                var totalPage = parseInt($(body).find('.mce-totalPage')[0].innerHTML);
                var jumpPage = parseInt($(body).find('.mce-number')[0].value);

                if(e.target.className == 'mce-pagePrev') {

                    if( currentPage <= 1) {
                        return;
                    } else {
                        // console.log("上一页");
                        // console.log(e);
                        currentPage -=1;
                        editor.getParams.page = currentPage;
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                } else if (e.target.className == 'mce-pageNext'){

                    if(currentPage >= totalPage) {
                        return;
                    } else {
                        // console.log(currentPage);
                        // console.log(totalPage);
                        currentPage +=1;
                        // console.log("下一页");
                        editor.getParams.page = currentPage;
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                } else if(e.target.className == 'mce-pageJump') {
                    if(jumpPage > totalPage || jumpPage < 1) {
                        return;
                    } else {
                        // console.log("跳转");
                        editor.getParams.page = jumpPage;
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                }
            }
        };

        arr.push(pageBox);
        editor.windowManager.open({
            title: '输入匹配',
            body: arr,

            onSubmit: function(e) {
                var checkArr = {
                    data: []
                };
                for(var key in e.data){
                    var index = key.slice(4);
                    if(e.data[key]) {
                        checkArr.data.push(items.pageItems[index])
                    }
                }
                coAsyncRecommendList(editor, checkArr);
            }
        })
    };

    function showDialog() {
        // var html = editor.getContent();   //所有内容
        var current = editor.selection.getContent();  //光标选择的
        data = {};

        editor.windowManager.open({
            title: '输入匹配',
            body:[
                {
                    name: 'keyword',
                    type: 'textbox',
                    size: 40,
                    label: '请输入关键字'
                },
                {
                    type: 'button',
                    name: 'button',
                    checked: true,
                    text: '福利购',
                    onclick: function (e) {
                        // console.log(e);
                        var body = e.target.offsetParent.offsetParent;
                        // console.log($(body).find('.mce-textbox'));
                        // console.log($(body).find('.mce-textbox')[0].value);
                        editor.isAutoMatch = false;
                        editor.getParams = {
                            itemType: 2,
                            itemKeyWordList: $(body).find('.mce-textbox')[0].value || '',
                        }
                        // console.log(e.getParams);
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                },
                {
                    type: 'button',
                    name: 'button'
                    ,
                    checked: true,
                    text: '好物',
                    onclick: function (e) {
                        // console.log(e);
                        var body = e.target.offsetParent.offsetParent;
                        // console.log($(body).find('.mce-textbox'));
                        // console.log($(body).find('.mce-textbox')[0].value);

                        editor.isAutoMatch = false;
                        editor.getParams = {
                            itemType: 1,
                            itemKeyWordList: $(body).find('.mce-textbox')[0].value || '',
                        }
                        // console.log(e.getParams);
                        this.parent().parent().close();
                        editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
                    }
                },
                {
                    type: 'container',
                    html: '' +
                    '<div>温馨提示：点击OK,默认选择福利购</div>'
                }
            ],
            onSubmit: function(e) {
                editor.isAutoMatch = false;
                editor.getParams = {
                    itemType: 2,
                    itemKeyWordList: e.data.keyword || '',
                }
                // console.log(e.getParams);
                editor.settings.matchItem.getitemdetailCallback(editor,getDatas(editor,editor));
            }
        })
    };
})