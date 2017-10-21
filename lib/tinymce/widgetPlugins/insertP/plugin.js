/**
 * Created by a56832357 on 17/5/19.
 */
tinymce.PluginManager.add('insertP',function(editor){
    var id = "insertP";
    // console.log("ok");
    editor.addButton("insertP",{
        icon: 'insertP',
        tooltip: '商品换行',
        image : '/lib/tinymce/widgetPlugins/imageupload/img/icon-bussiness.png',
        onClick:showDialog
    });
    function showDialog(){
        var currentNode = editor.selection.getNode();
        var dom = editor.dom;
        while(currentNode) {
            if(currentNode.nodeName == 'DIV' && currentNode.getAttribute('class').includes("items-warp")) {
                var uniqueID = dom.uniqueId();
                var content = $('<p id="'+ uniqueID +'">&nbsp;</p>');
                /*--插入--*/
                content.insertAfter(currentNode);

                var newParagraph = dom.select( 'p#' + uniqueID )[0];
                editor.selection.setCursorLocation( newParagraph );   //获取光标
                find = true;
                currentNode = false;
            }
            currentNode = currentNode.parentNode;
        }
    }
})